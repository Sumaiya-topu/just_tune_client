from flask import Flask, request, Response, jsonify
import os

app = Flask(__name__)

# Create a global dictionary to store generated IDs
generated_ids = {}

@app.route('/api/generate_audio', methods=['POST'])
def generate_audio():
    try:
        # Generate a unique ID (you can use a UUID or any other unique identifier)
        unique_id = 1

        # Store the generated ID
        generated_ids[unique_id] = {}

        # Get the JSON data from the request body
        data = request.json

        # Extract input parameters for generating audio
        description = data.get('description')
        duration = data.get('duration')
        temp = data.get('temp')
        top_k = data.get('top_k')
        top_p = data.get('top_p')
        cfg_co = data.get('cfg_co')

        # Validate the input
        if not description or not isinstance(duration, (int, float)):
            return "Invalid input parameters", 400

        # Process the input parameters and generate audio (placeholder logic)
        # For demonstration purposes, let's assume you have a pre-existing "dummy.wav" file
        audio_file_path = 'audio/1.wav'

        # Check if the file exists
        if not os.path.isfile(audio_file_path):
            return "Audio file not found", 404

        # Calculate dummy frequency statistics (placeholder values)
        min_frequency = 20
        max_frequency = 20000
        avg_frequency = 440  # Placeholder value for A4, adjust as needed

        # Create a response JSON object
        response_data = {
            "min_frequency": min_frequency,
            "max_frequency": max_frequency,
            "avg_frequency": avg_frequency,
            "description": description
        }

        # Read the binary data from the audio file
        with open(audio_file_path, 'rb') as audio_file:
            audio_binary = audio_file.read()

        # Set the response headers for WAV content
        headers = {
            'Content-Type': 'audio/wav',
            'Content-Disposition': 'attachment; filename=generated.wav'
        }

        # Return the audio file and the JSON object
        return (Response(audio_binary, headers=headers, status=200), jsonify(response_data))

    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(debug=True)
