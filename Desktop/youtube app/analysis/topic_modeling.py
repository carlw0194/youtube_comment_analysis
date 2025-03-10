"""
Topic modeling and keyword extraction module using transformers.
"""
from transformers import pipeline
from textblob import TextBlob
import re
from collections import Counter

# Initialize zero-shot classification pipeline
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

# Common topics in YouTube comments
CANDIDATE_TOPICS = [
    "content quality",
    "technical issues",
    "suggestions",
    "questions",
    "praise",
    "criticism",
    "spam",
    "off-topic"
]

def clean_text(text):
    """
    Clean and preprocess text for analysis.
    
    Args:
        text (str): Raw text
        
    Returns:
        str: Cleaned text
    """
    # Convert to lowercase
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)
    
    # Remove special characters and numbers
    text = re.sub(r'[^\w\s]', '', text)
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    return text

def extract_topics(text, confidence_threshold=0.3):
    """
    Extract topics and keywords from text using zero-shot classification
    and keyword extraction.
    
    Args:
        text (str): Text to analyze
        confidence_threshold (float): Minimum confidence score for topic assignment
        
    Returns:
        tuple: (list of topics, list of keywords)
    """
    try:
        # Clean the text
        cleaned_text = clean_text(text)
        
        # Skip very short texts
        if len(cleaned_text.split()) < 3:
            return [], []
        
        # Perform zero-shot classification
        result = classifier(
            cleaned_text,
            candidate_labels=CANDIDATE_TOPICS,
            multi_label=True
        )
        
        # Filter topics by confidence threshold
        topics = [
            label for label, score in zip(result['labels'], result['scores'])
            if score > confidence_threshold
        ]
        
        # Extract keywords using TextBlob
        blob = TextBlob(cleaned_text)
        
        # Get noun phrases as potential keywords
        noun_phrases = blob.noun_phrases
        
        # Get individual words and their frequencies
        words = cleaned_text.split()
        word_freq = Counter(words)
        
        # Combine noun phrases and frequent individual words
        keywords = list(noun_phrases)
        for word, freq in word_freq.most_common(5):
            if (
                len(word) > 3  # Skip very short words
                and word not in keywords
                and freq > 1  # Word appears more than once
            ):
                keywords.append(word)
        
        return topics, keywords[:5]  # Limit to top 5 keywords
        
    except Exception as e:
        print(f"Error in topic extraction: {str(e)}")
        return [], []

def analyze_topic_trends(comments):
    """
    Analyze topic trends across multiple comments.
    
    Args:
        comments (list): List of comment texts
        
    Returns:
        dict: Topic trends and statistics
    """
    topic_counts = Counter()
    keyword_counts = Counter()
    
    for comment in comments:
        topics, keywords = extract_topics(comment)
        topic_counts.update(topics)
        keyword_counts.update(keywords)
    
    return {
        'top_topics': dict(topic_counts.most_common(5)),
        'top_keywords': dict(keyword_counts.most_common(10)),
        'total_comments': len(comments)
    }
