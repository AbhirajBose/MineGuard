# Gemini API Integration Setup

This guide will help you set up the Gemini API integration for the MineGuard equipment verification system.

## Prerequisites

1. A Google account
2. Access to Google AI Studio (formerly MakerSuite)

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" or use an existing one
4. Copy your API key

## Step 2: Configure Environment Variables

1. Create a `.env` file in the root directory of your project
2. Add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your real API key from Google AI Studio.

## Step 3: Restart Your Development Server

After adding the `.env` file, restart your development server:

```bash
npm run dev
```

## Step 4: Test the Integration

1. Navigate to the "Equipment Verification" section in the dashboard
2. Click "Start Scan" or "Scan Again"
3. Allow camera access when prompted
4. Take a photo or upload an image
5. Click "Analyze Equipment"

The system will now use Gemini AI to analyze the image and detect safety equipment.

## Features

### Live Camera Integration
- Real-time video capture
- Photo capture functionality
- File upload support

### AI-Powered Analysis
- Detects 7 types of safety equipment:
  - Safety Helmet
  - Safety Jacket
  - Safety Goggles
  - Ear Protection
  - Respirator
  - Safety Gloves
  - Safety Boots

### Local Database
- Stores scan results locally using localStorage
- Maintains scan history
- Provides analytics and statistics

### Real-time Feedback
- Live progress indicators
- Confidence scores for each equipment type
- Pass/fail status for overall scan

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in the `.env` file
- Verify the API key is valid in Google AI Studio
- Check that the environment variable name is exactly `VITE_GEMINI_API_KEY`

### Camera Access Issues
- Ensure your browser supports camera access
- Check that you've granted camera permissions
- Try refreshing the page and allowing camera access again

### Analysis Failures
- Check your internet connection
- Verify your Gemini API quota hasn't been exceeded
- Ensure the image is clear and well-lit

## Security Notes

- Never commit your `.env` file to version control
- The API key is only used client-side for this demo
- In production, consider using a backend service to handle API calls

## API Usage

The integration uses the Gemini 1.5 Flash model for image analysis. Each scan analyzes 7 equipment types, so expect 7 API calls per scan.

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is working in Google AI Studio
3. Ensure all environment variables are properly set 