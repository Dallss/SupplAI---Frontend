<template>
    <div>
    <h1 style="color:green;">Food Freshness Predictor</h1>

    <!-- Image Upload Option -->
    <input class="results" type="file" @change="uploadImage" accept="image/*">
    
    <!-- Camera Option -->
    <button @click="openCamera">Open Camera</button>
    <video v-if="isCameraOpen" ref="camera" autoplay></video>
    <button v-if="isCameraOpen" @click="capturePhoto">Capture Photo</button>

    <!-- Image Preview -->
    <img v-if="previewImage" :src="previewImage" alt="Uploaded Image" style="max-width: 300px; margin-top: 10px;">
    
    <!-- Predict Button -->
    <button @click="predictFreshness" :disabled="!imageFile">Predict Freshness</button>

    <!-- Results -->
    <div v-if="predictions.length">
    <h3 class="results">Results:</h3>
    <ul class="results">
        <li v-for="(prediction, index) in predictions" :key="index">
        {{ prediction.food }} - Confidence: {{ prediction.confidence.toFixed(2) }}%
        </li>
    </ul>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
data() {
    return {
    imageFile: null,
    previewImage: null,
    predictions: [],
    isCameraOpen: false,
    cameraStream: null,
    };
},
methods: {
    uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
            this.imageFile = file;
            this.previewImage = URL.createObjectURL(file);
        }
    },
    async predictFreshness() {
        if (!this.imageFile) return;

        const formData = new FormData();
        formData.append("file", this.imageFile);

        try {
            // const response = await axios.post("https://b929-202-90-135-62.ngrok-free.app/predict/", formData, {
            const response = await axios.post("http://localhost:8000/predict/", formData, {
            headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("API Response:", response.data);
            this.predictions = response.data.predictions || [];
        } catch (error) {
            console.error("Prediction failed:", error);
        }
    },
    openCamera() {
        this.isCameraOpen = true;
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
            this.cameraStream = stream;
            this.$refs.camera.srcObject = stream;
            })
            .catch(error => console.error("Camera access denied:", error));
    },
    capturePhoto() {
        const video = this.$refs.camera;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob and ensure a proper file upload
        canvas.toBlob(blob => {
            if (blob) {
                const file = new File([blob], "captured.jpg", { type: "image/jpeg" });

                this.imageFile = file; // Set the image file for prediction
                this.previewImage = URL.createObjectURL(blob); // Show the preview

                console.log("Captured image file:", this.imageFile); // Debugging

                // Stop the camera after capturing
                this.stopCamera();
            }
        }, "image/jpeg");
    },

    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
        }
        this.isCameraOpen = false;
    }
}
};
</script>

<style>
button {
margin-top: 10px;
padding: 10px;
background-color: #28a745;
color: white;
border: none;
cursor: pointer;
}
button:disabled {
background-color: #ccc;
}
.results {
color: #004d00; /* Dark Green */
font-weight: bold;
font-size: 18px;
}
video {
width: 300px;
margin-top: 10px;
}
</style>
