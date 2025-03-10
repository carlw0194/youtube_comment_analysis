"""
Sentiment analysis module using Hugging Face Transformers.
"""
from transformers import pipeline
from textblob import TextBlob

# Initialize sentiment analysis pipeline
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english",
    return_all_scores=True
)

def analyze_sentiment(text):
    """
    Analyze the sentiment of a text using both Transformers and TextBlob.
    
    This function uses a hybrid approach:
    1. Transformers for deep learning-based sentiment analysis
    2. TextBlob as a backup and validation
    
    Args:
        text (str): The text to analyze
        
    Returns:
        str: Sentiment label ('positive', 'negative', or 'neutral')
    """
    try:
        # Get sentiment scores from transformer model
        transformer_result = sentiment_analyzer(text)[0]
        
        # Get TextBlob polarity as a backup/validation
        blob = TextBlob(text)
        textblob_polarity = blob.sentiment.polarity
        
        # Combine both signals for more robust analysis
        if textblob_polarity > 0.1:
            # Clearly positive
            return 'positive'
        elif textblob_polarity < -0.1:
            # Clearly negative
            return 'negative'
        else:
            # Use transformer result for borderline cases
            max_score = max(transformer_result, key=lambda x: x['score'])
            if max_score['score'] > 0.7:  # High confidence threshold
                return max_score['label'].lower()
            return 'neutral'
            
    except Exception as e:
        print(f"Error in sentiment analysis: {str(e)}")
        # Default to neutral if there's an error
        return 'neutral'
