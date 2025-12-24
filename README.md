# Football Celebrity Classifier ⚽

A full-stack web application that classifies football legends using **Computer Vision**. This project uses **Haar Cascades** for face detection, **SVM (Support Vector Machine)** for classification, and **Flask** for the backend API.



## 🏗️ Project Structure
The repository is organized into three main components:

- **`/server`**: The Flask backend that handles API requests and image processing.
- **`/model`**: Contains the trained SVM model, Haar Cascade XMLs, and the training scripts.
- **`/ui`**: The frontend interface (HTML/CSS/JS) where users upload images.

## 🚀 How It Works
1. **Detection:** When an image is uploaded via the **UI**, the **Flask** server passes it to the **Model** logic.
2. **Preprocessing:** OpenCV uses **Haar Cascades** to detect the face and crop the image to the "Region of Interest" (ROI).
3. **Classification:** The cropped face is transformed into a feature vector and fed into the **SVM Classifier**.
4. **Response:** The predicted name and probability are sent back to the UI for display.

## 🛠️ Tech Stack
- **Backend:** Python, Flask
- **AI/ML:** OpenCV, Scikit-Learn (SVM), Haar Cascades
- **Frontend:** HTML, CSS, JavaScript

## 📥 Installation
1. Clone the repository:
```bash
git clone [https://github.com/Zakaria-png-tech/football_celebrity.git](https://github.com/Zakaria-png-tech/football_celebrity.git)
```

2. Start the Flask Server:
```bash
python server.py
```
