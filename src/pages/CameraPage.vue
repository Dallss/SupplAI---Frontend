<template>
    <div class="camera-page">
        <img class="logo" src="../assets/logo.png" alt="">
        <h1>Produce Health Monitor</h1>

        <div class="cam-main">
            
            <!-- Camera Option -->
            <button class="b1" @click="openCamera">Open Camera</button>
            <video v-if="isCameraOpen" ref="camera" autoplay></video>
            <button v-if="isCameraOpen" @click="capturePhoto">Capture</button>
            
            <!-- Image Preview -->
            <img v-if="previewImage" :src="previewImage" alt="Uploaded Image" style="max-width: 300px; margin-top: 10px;">
            <!-- Display Batch & Produce Information -->
             <p>or</p>
             <p>Upload an image</p>
            <!-- Image Upload Option -->
            <input class="results" type="file" @change="uploadImage" accept="image/*">
            <h2>Batch ID: {{ batch }}</h2>
            <h2>Produce: {{ produce }}</h2>
            
            <!-- Predict Button -->
            <button class="b2" @click="predictFreshness" :disabled="!imageFile">Check Health</button>
    
            <!-- Results -->
            <div v-if="predictions.length">
                <h3 class="results">Results:</h3>
                <ul class="results">
                    <li v-for="(prediction, index) in predictions" :key="index">
                        {{ prediction.food }} - Confidence: {{ prediction.confidence.toFixed(2) }}%
                    </li>
                </ul>
                <button class="b3" @click="showModal = true">Confirm Prediction</button>
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

<style scoped>
/* General Styling */
.camera-page {
    padding: 16px;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.logo {
    margin: -30px;
    margin-top: -30px;
}

p {
    font-size: 16px;
    color: #666;
}
/* Headings */
h1 {
    color: #347e2c;
    font-size: 24px;
    font-weight: bold;
    /* text-align: center; */
}

h2 {
    font-size: 18px;
    color: #222;
    font-weight: normal;
}

/* Main Content */
.cam-main {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F8FAF9;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* File Input */
input[type="file"] {
    width: 100%;
    max-width: 250px;
    margin: 8px 0;
}

/* Buttons */
.b1, .b2, .b3 {
    width: 100%;
    max-width: 250px;
    padding: 12px;
    background-color: #354833;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background-color: #2b3a27;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Video Preview */
video {
    width: 100%;
    max-width: 350px;
    border-radius: 10px;
    margin: 12px;
    height: 400px;
    object-fit: cover;
    aspect-ratio: 9 / 16;
}

/* Image Preview */
img {
    width: 100%;
    max-width: 300px;
    margin-top: 10px;
    border-radius: 10px;
}

/* Results Styling */
.results {
    font-size: 16px;
    color: #004d00;
    font-weight: bold;
    text-align: center;
}

/* Modal */
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 350px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.modal-content button {
    margin: 10px 0;
}

</style>

