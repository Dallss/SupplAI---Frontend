<template>
    <h1>Food Freshness Predictor</h1>
    <div class="camera-page">

        <!-- Display Batch & Produce Information -->
        <h2>Batch ID: {{ batch }}</h2>
        <h2>Produce: {{ produce }}</h2>

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
            <button @click="showModal = true">Confirm Prediction</button>
        </div>

        <!-- Confirmation Modal -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2>Confirm AI Prediction</h2>
                <p>Is this prediction correct?</p>
                <button @click="confirmPrediction(true)">Yes</button>
                <button @click="confirmPrediction(false)">No</button>
            </div>
        </div>

        <!-- Update Health Button (Shown Only After Confirmation) -->
        <button v-if="confirmed" @click="updateHealth" style="margin-top: 20px;">Update Health</button>
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
        batch: "",
        produce: "",
        showModal: false,
        confirmed: false
    };
},
created() {
    // Fetch batch and produce from URL query params
    const query = this.$route.query;
    this.batch = query.batch || "Unknown";
    this.produce = query.produce || "Unknown";
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
            const response = await axios.post("http://localhost:8000/predict/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("API Response:", response.data);
            this.predictions = response.data.predictions || [];
        } catch (error) {
            console.error("Prediction failed:", error);
        }
    },
    confirmPrediction(isCorrect) {
        this.showModal = false;
        if (isCorrect) {
            this.confirmed = true;
        } else {
            alert("Please upload a new image.");
        }
    },
    async updateHealth() {
        try {
            const response = await axios.post("http://localhost:8000/batch/BatchProduceViewSet", {
                batch: this.batch,
                produce: this.produce,
                status: "Updated"
            });

            console.log("Update Response:", response.data);
            alert("Health updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
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

        canvas.toBlob(blob => {
            if (blob) {
                const file = new File([blob], "captured.jpg", { type: "image/jpeg" });

                this.imageFile = file; 
                this.previewImage = URL.createObjectURL(blob); 

                console.log("Captured image file:", this.imageFile); 

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

    h1 {
        color: black;
    }
    .camera-page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button {
        margin-top: 10px;
        padding: 10px;
        background-color: #354833;
        color: white;
        border: none;
        border-radius: 10px;
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
        border-radius: 10px;
    }
</style>

