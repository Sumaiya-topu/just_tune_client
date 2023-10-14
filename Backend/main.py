from flask import Flask, request, Response, jsonify
import os

app = Flask(__name__)

@app.route('/api/generate_wav', methods=['POST'])
def generate_wav():
    try:
        # Get the JSON data from the request body
        data = request.json

        # Extract "text" and "second" from the JSON data
        text = data.get('text')
        second = data.get('second')

        print('text is: ', text)
        print('Time is: ', second)

        # Validate the input
        if not text:
            return "Text input is missing or invalid", 400

        if second is None:
            return "Second parameter is missing or invalid", 400

        # Process the "text" and "second" values as needed

        # For demonstration purposes, let's assume you have a "1.wav" file
        audio_file_path = 'audio/1.wav'

        # Check if the file exists
        if not os.path.isfile(audio_file_path):
            return "Audio file not found", 404

        # Read the binary data from the audio file
        with open(audio_file_path, 'rb') as audio_file:
            audio_binary = audio_file.read()

        # Prepare the response data
        response_data = {
            'name': text,
            'second': second,
            'audio_file': audio_binary  # Include audio data as binary
        }

        # Set the response headers for WAV content
        headers = {
            'Content-Type': 'audio/wav',
            'Content-Disposition': f'attachment; filename=generated.wav'
        }

        return Response(response_data['audio_file'], headers=headers, status=200)

    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(debug=True)
