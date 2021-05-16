from deepface import DeepFace
obj = DeepFace.analyze(img_path = "C:/Users/ACER/Desktop/emotion detection/new/img.jpg", actions = ['age', 'gender', 'emotion'])
#objs = DeepFace.analyze(["img1.jpg", "img2.jpg", "img3.jpg"]) #analyzing multiple faces same time
print(obj["age"]," years old "," ",obj["dominant_emotion"]," ", obj["gender"])
# input();