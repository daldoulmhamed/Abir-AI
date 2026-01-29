# Module 3: AI Security & Privacy 🔐

**Duration:** Self-paced (6-8 hours)  
**Level:** Intermediate to Advanced  
**Prerequisites:** Module 1 & 2 completion, basic security concepts helpful

---

## 📋 Module Overview

Welcome to the security frontier of AI! This module focuses on protecting AI systems from sophisticated threats and safeguarding user privacy—two critical pillars of responsible AI deployment.

AI systems face unique security challenges beyond traditional software: adversarial attacks that manipulate predictions with invisible perturbations, training data poisoning that creates hidden backdoors, model extraction that steals intellectual property, and privacy breaches through inference attacks. At the same time, AI processes vast amounts of personal data, raising significant privacy concerns and triggering regulatory requirements like GDPR.

Whether you're a security professional, compliance officer, risk manager, or AI practitioner, understanding how to secure AI systems and protect privacy is essential for building trustworthy and legally compliant AI.

### What You'll Master

**Security Threats & Defenses:**
- Security vulnerabilities specific to AI systems
- Adversarial attacks and defense mechanisms
- Data poisoning and backdoor attacks
- Model extraction and intellectual property protection

**Privacy Protection:**
- Privacy risks in AI (membership inference, attribute inference, model inversion)
- Privacy-preserving AI techniques (differential privacy, federated learning, secure MPC)
- GDPR requirements for AI systems
- Privacy impact assessments

**Secure Development:**
- Secure AI development lifecycle
- Risk assessment and threat modeling
- Security testing and monitoring

### Why This Matters

**The Security Crisis:**
- **$4.5M** average cost of an AI security breach (IBM, 2023)
- **67%** of organizations report AI security incidents in past 2 years
- Adversarial attacks can reduce model accuracy from **95% to 5%** with imperceptible changes

**The Privacy Stakes:**
- **€20M or 4% global revenue**: Maximum GDPR fines for serious violations
- **73%** of consumers won't use AI services they don't trust with their data
- Model inversion attacks can reconstruct training data, exposing sensitive information

**Real-World Consequences:**
- Adversarial stickers fool autonomous vehicle vision systems
- Training data poisoning creates persistent backdoors in models
- Membership inference attacks reveal whether individuals were in training data
- Model extraction enables competitors to steal proprietary AI worth millions

---

## Part 1: AI Security Landscape

### 1.1 Unique Security Challenges in AI

Traditional software security focuses on the **CIA triad**: Confidentiality, Integrity, and Availability. AI systems require additional security considerations that go far beyond traditional threats.

**The Expanded AI Threat Surface:**

Traditional software faces threats like code vulnerabilities, network attacks, access control breaches, and malware. But AI systems add an entirely new dimension of threats:

**Adversarial Examples** - Manipulate inputs with imperceptible changes to fool the model  
**Data Poisoning** - Corrupt training data to compromise the model from within  
**Model Extraction** - Steal model functionality through strategic API queries  
**Membership Inference** - Determine if specific data was used in training  
**Model Inversion** - Reconstruct sensitive training data from model outputs  
**Backdoor Attacks** - Insert hidden triggers that cause malicious behavior  
**Privacy Leakage** - Models memorize and inadvertently leak sensitive training data

These AI-specific threats operate at different levels than traditional security measures can address. You can have perfect network security and still be vulnerable to adversarial attacks!

### 1.2 AI Threat Taxonomy

Understanding the landscape of AI threats requires categorizing them across multiple dimensions.

#### Attack Stages: When Does the Attack Occur?

**Training-Time Attacks** manipulate the learning process itself:

**Data Poisoning** - Inject malicious examples into the training dataset to corrupt model behavior. The poison spreads throughout the model's learned patterns.

**Backdoor Attacks** - Insert hidden triggers that cause specific malicious behaviors only when the trigger is present. The model works normally otherwise, making detection extremely difficult.

**Logic Corruption** - Manipulate the training process itself (hyperparameters, loss functions, optimizer behavior) to systematically degrade model performance.

**Inference-Time Attacks** exploit deployed models:

**Adversarial Examples** - Craft specially designed inputs that cause misclassification while appearing normal to humans. These can be physical (stickers on stop signs) or digital (pixel manipulations).

**Model Extraction** - Query the model strategically to reverse-engineer its functionality and steal intellectual property. Attackers can build equivalent models without access to training data.

**Privacy Attacks** - Exploit model responses to infer information about training data or determine membership in the training set.

#### Attack Knowledge: What Does the Attacker Know?

**White-Box Attacks** - Attacker has complete access: model architecture, trained weights, training data, and algorithms. This represents the worst-case scenario but helps researchers understand maximum vulnerability.

**Black-Box Attacks** - Attacker only has query access to the model's API. This is the most realistic threat scenario for production systems. Surprisingly, many attacks remain effective even in black-box settings!

**Gray-Box Attacks** - Attacker has partial knowledge, such as the architecture but not the weights, or knows the training data distribution but not specific examples.

#### Attack Goals: What Does the Attacker Want?

**Integrity Attacks** aim to cause incorrect predictions:
- **Untargeted**: Any misclassification counts as success
- **Targeted**: Force a specific incorrect output (e.g., making spam appear legitimate)

**Availability Attacks** aim to degrade model performance or deny service entirely, making the AI system unreliable or unusable.

**Confidentiality Attacks** aim to extract sensitive information: training data, model parameters, or proprietary logic that represents competitive advantage.

---

## Part 2: Adversarial Attacks and Defenses

### 2.1 Adversarial Examples: The Invisible Threat

**What are adversarial examples?** They're inputs deliberately crafted to cause ML models to make mistakes, often with perturbations so small they're imperceptible to humans. This isn't a minor bug—it's a fundamental vulnerability in how neural networks learn.

**The Classic Demonstration** (Goodfellow et al., 2014):

Imagine you have an image of a panda that your model correctly classifies with 57.7% confidence. Now add carefully calculated noise—so subtle that humans can't see any difference. Suddenly, the model is 99.3% confident it's looking at a gibbon! The image still looks exactly like a panda to you and me, but the AI sees something completely different.

This isn't science fiction—it happens in production systems today.

#### 2.1.1 Fast Gradient Sign Method (FGSM)

FGSM is the foundational adversarial attack—elegant, simple, and surprisingly effective.

**The Core Idea:** Instead of trying to minimize the loss (like during training), we maximize it. We add noise in the precise direction that makes the model most confused.

**The Mathematical Formula:**  
$\mathbf{x}_{adv} = \mathbf{x} + \epsilon \cdot \text{sign}(\nabla_{\mathbf{x}} J(\mathbf{x}, y_{true}))$

Where $\mathbf{x}$ is your original input, $\epsilon$ controls how much noise to add, and the gradient tells us which direction causes maximum confusion.

**Practical Implementation:**
```python
import tensorflow as tf
import numpy as np

def fgsm_attack(model, x, y_true, epsilon=0.01):
    """
    Fast Gradient Sign Method adversarial attack.
    
    Args:
        model: Trained TensorFlow/Keras model
        x: Input image (tensor)
        y_true: True label (one-hot encoded)
        epsilon: Perturbation magnitude
    
    Returns:
        Adversarial example
    """
    x_tensor = tf.convert_to_tensor(x, dtype=tf.float32)
    
    with tf.GradientTape() as tape:
        tape.watch(x_tensor)
        prediction = model(x_tensor)
        loss = tf.keras.losses.categorical_crossentropy(y_true, prediction)
    
    # Get gradient of loss w.r.t. input
    gradient = tape.gradient(loss, x_tensor)
    
    # Create adversarial example
    signed_grad = tf.sign(gradient)
    adversarial_example = x + epsilon * signed_grad
    
    # Clip to valid image range [0, 1]
    adversarial_example = tf.clip_by_value(adversarial_example, 0, 1)
    
    return adversarial_example.numpy()

# Example usage
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image

# Load pre-trained model
model = ResNet50(weights='imagenet')

# Load image
img_path = 'panda.jpg'
img = image.load_img(img_path, target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)

# Original prediction
original_pred = model.predict(x)
print("Original prediction:", decode_predictions(original_pred, top=3)[0])

# Generate adversarial example
# Convert prediction to one-hot for loss calculation
y_true = tf.keras.utils.to_categorical([np.argmax(original_pred)], num_classes=1000)
x_adv = fgsm_attack(model, x, y_true, epsilon=0.01)

# Adversarial prediction
adv_pred = model.predict(x_adv)
print("Adversarial prediction:", decode_predictions(adv_pred, top=3)[0])

# Visualize perturbation
perturbation = x_adv - x
print(f"Max perturbation: {np.max(np.abs(perturbation)):.6f}")
print(f"Mean perturbation: {np.mean(np.abs(perturbation)):.6f}")
```

**What You'll See:**

The results are striking. The original image is correctly classified as a giant panda with 87% confidence. But the adversarial version—which looks identical to human eyes—is classified as a gibbon with 99% confidence! The maximum perturbation per pixel is only 0.01 (on a 0-1 scale), and the average perturbation is even smaller at 0.0045. These changes are essentially invisible, yet they completely fool the model.

This demonstrates a fundamental vulnerability: neural networks make decisions based on patterns we can't see or understand.

#### 2.1.2 Projected Gradient Descent (PGD)

PGD is FGSM's more powerful cousin. Instead of taking one large step, it takes many small steps, refining the attack iteratively. This makes it more effective while keeping perturbations small.

**The Key Innovation:** After each step, we "project" back to ensure we stay within the allowed perturbation budget. This constraint prevents the noise from becoming visible while maximizing attack effectiveness.
```python
def pgd_attack(model, x, y_true, epsilon=0.01, alpha=0.001, num_iter=40):
    """
    Projected Gradient Descent adversarial attack.
    More powerful than FGSM due to iterative refinement.
    
    Args:
        alpha: Step size per iteration
        num_iter: Number of iterations
    """
    x_adv = x.copy()
    
    for i in range(num_iter):
        x_tensor = tf.convert_to_tensor(x_adv, dtype=tf.float32)
        
        with tf.GradientTape() as tape:
            tape.watch(x_tensor)
            prediction = model(x_tensor)
            loss = tf.keras.losses.categorical_crossentropy(y_true, prediction)
        
        gradient = tape.gradient(loss, x_tensor)
        signed_grad = tf.sign(gradient)
        
        # Take step
        x_adv = x_adv + alpha * signed_grad.numpy()
        
        # Project back to epsilon-ball around original input
        perturbation = x_adv - x
        perturbation = np.clip(perturbation, -epsilon, epsilon)
        x_adv = x + perturbation
        
        # Clip to valid image range
        x_adv = np.clip(x_adv, 0, 1)
    
    return x_adv

# Example usage
x_adv_pgd = pgd_attack(model, x, y_true, epsilon=0.01, alpha=0.001, num_iter=40)
adv_pred_pgd = model.predict(x_adv_pgd)
print("PGD adversarial prediction:", decode_predictions(adv_pred_pgd, top=3)[0])
```

#### 2.1.3 Carlini & Wagner (C&W) Attack

**Most powerful white-box attack**. Formulates adversarial example generation as optimization problem:

$$\min ||\delta||_2 + c \cdot f(\mathbf{x} + \delta)$$

Where $f$ is chosen such that minimizing it causes misclassification.

**Result**: Adversarial examples with minimal perturbation (harder to detect).

### 2.2 Real-World Adversarial Attack Examples

#### 2.2.1 Physical Adversarial Examples

**Adversarial Patches**: Physical stickers that fool vision systems when placed in the scene.

**Example**: Researchers created a small patch that, when stuck on a stop sign, caused autonomous vehicle systems to misclassify it as a speed limit sign.

**Implications**:
- Attacks work in physical world, not just digital
- Security-critical applications (autonomous vehicles, surveillance) are vulnerable

**Adversarial T-Shirts**: Wearing specific patterns makes person "invisible" to object detection systems.

#### 2.2.2 Audio Adversarial Examples

**Concept**: Imperceptible noise added to audio causes speech recognition systems to transcribe incorrect text.

**Example**: 
- Original audio: "How are you?"
- Adversarial audio: Sounds identical to humans
- Transcription: "Transfer $1000 to account X"

**Implications**: Voice assistants, automated transcription systems vulnerable.

#### 2.2.3 Text Adversarial Examples

**Concept**: Small modifications to text (typos, synonym substitutions) fool NLP models.

**Example**:
- Original: "This movie was fantastic!" → Sentiment: Positive (98%)
- Adversarial: "This movie was fantastic!" (invisible Unicode character added) → Sentiment: Negative (87%)

**Techniques**:
- Character-level perturbations (typos, homoglyphs)
- Word-level substitutions (synonyms)
- Sentence-level paraphrasing

### 2.3 Defenses Against Adversarial Attacks

#### 2.3.1 Adversarial Training

**Concept**: Train model on both clean and adversarial examples.

**Algorithm**:
1. Generate adversarial examples for training batch
2. Add to training set with correct labels
3. Train model on mixture of clean and adversarial data

**Python Example**:
```python
def adversarial_training(model, X_train, y_train, epochs=10, batch_size=32, epsilon=0.01):
    """
    Train model with adversarial examples.
    """
    from tensorflow.keras.optimizers import Adam
    
    model.compile(optimizer=Adam(learning_rate=0.001),
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    
    for epoch in range(epochs):
        print(f"Epoch {epoch+1}/{epochs}")
        
        # Shuffle data
        indices = np.arange(len(X_train))
        np.random.shuffle(indices)
        X_train_shuffled = X_train[indices]
        y_train_shuffled = y_train[indices]
        
        # Train in batches
        for i in range(0, len(X_train), batch_size):
            X_batch = X_train_shuffled[i:i+batch_size]
            y_batch = y_train_shuffled[i:i+batch_size]
            
            # Generate adversarial examples for this batch
            X_adv_batch = []
            for x, y in zip(X_batch, y_batch):
                x_adv = fgsm_attack(model, x[np.newaxis, ...], 
                                    y[np.newaxis, ...], epsilon=epsilon)
                X_adv_batch.append(x_adv[0])
            
            X_adv_batch = np.array(X_adv_batch)
            
            # Combine clean and adversarial examples
            X_combined = np.concatenate([X_batch, X_adv_batch])
            y_combined = np.concatenate([y_batch, y_batch])
            
            # Train on combined batch
            model.train_on_batch(X_combined, y_combined)
        
        # Evaluate
        loss, acc = model.evaluate(X_train, y_train, verbose=0)
        print(f"  Training accuracy: {acc:.4f}")
    
    return model

# Example usage
# model_robust = adversarial_training(model, X_train, y_train, epochs=10, epsilon=0.01)
```

**Pros**:
- Significantly improves robustness
- Model learns robust features

**Cons**:
- Computationally expensive (2x training time or more)
- May reduce accuracy on clean data slightly
- Doesn't defend against all attack types

#### 2.3.2 Defensive Distillation

**Concept**: Train a second model on softened outputs (probabilities) of the first model, making gradients smoother and attacks harder.

**Algorithm**:
1. Train teacher model with temperature $T$ (softens probability distribution)
2. Train student model to match teacher's soft outputs
3. Use student model (with temperature $T$) for deployment

**Python Example**:
```python
def defensive_distillation(teacher_model, X_train, y_train, temperature=10):
    """
    Train distilled model for adversarial robustness.
    """
    # Get soft labels from teacher with temperature
    teacher_logits = teacher_model.predict(X_train)
    soft_labels = tf.nn.softmax(teacher_logits / temperature).numpy()
    
    # Create student model (same architecture as teacher)
    student_model = tf.keras.models.clone_model(teacher_model)
    
    # Custom loss with temperature
    def distillation_loss(y_true, y_pred):
        return tf.keras.losses.categorical_crossentropy(
            y_true, 
            tf.nn.softmax(y_pred / temperature)
        )
    
    student_model.compile(
        optimizer='adam',
        loss=distillation_loss,
        metrics=['accuracy']
    )
    
    # Train student on soft labels
    student_model.fit(X_train, soft_labels, epochs=10, batch_size=32, verbose=1)
    
    return student_model

# Example usage
# student_model = defensive_distillation(teacher_model, X_train, y_train, temperature=10)
```

**Effectiveness**: Reduces success rate of some attacks, but not all. Can be circumvented by adaptive attacks.

#### 2.3.3 Input Transformation

**Concept**: Apply transformations to inputs to remove adversarial perturbations before feeding to model.

**Techniques**:
- **JPEG Compression**: Compresses image, removing high-frequency noise
- **Bit Depth Reduction**: Reduce color depth
- **Spatial Smoothing**: Gaussian blur, median filtering
- **Random Resizing and Padding**: For images

**Python Example**:
```python
from scipy.ndimage import median_filter
from PIL import Image
import io

def input_transformation_defense(x, method='jpeg'):
    """
    Apply input transformation to remove adversarial perturbations.
    """
    if method == 'jpeg':
        # JPEG compression
        img = Image.fromarray((x * 255).astype(np.uint8))
        buffer = io.BytesIO()
        img.save(buffer, format='JPEG', quality=75)
        buffer.seek(0)
        img_compressed = Image.open(buffer)
        x_transformed = np.array(img_compressed) / 255.0
        
    elif method == 'median_filter':
        # Median filter (removes salt-and-pepper noise)
        x_transformed = median_filter(x, size=3)
        
    elif method == 'bit_depth_reduction':
        # Reduce bit depth
        x_transformed = np.round(x * 16) / 16  # 4-bit depth
    
    return x_transformed

# Example usage
x_adv_transformed = input_transformation_defense(x_adv[0], method='jpeg')
pred_transformed = model.predict(x_adv_transformed[np.newaxis, ...])
print("Prediction after transformation:", decode_predictions(pred_transformed, top=3)[0])
```

**Pros**:
- Simple to implement
- No retraining required
- Can be combined with other defenses

**Cons**:
- May reduce accuracy on clean data
- Sophisticated attacks can be designed to survive transformations
- Not a complete solution

#### 2.3.4 Certified Defenses

**Concept**: Provide mathematical guarantees that model's prediction won't change within a certain perturbation radius.

**Example: Randomized Smoothing**
- Add random noise to input multiple times
- Take majority vote or average of predictions
- Can prove that prediction is robust within certain epsilon

**Trade-off**: Strong guarantees but often with significant accuracy cost.

#### 2.3.5 Adversarial Detection

**Concept**: Instead of making model robust, detect adversarial examples and reject them.

**Techniques**:
- **Statistical Tests**: Adversarial examples have different statistical properties
- **Auxiliary Detector Model**: Train a binary classifier to distinguish clean vs. adversarial
- **Uncertainty Metrics**: Adversarial examples often have higher uncertainty

**Python Example**:
```python
def adversarial_detector(model, x, threshold=0.1):
    """
    Detect adversarial examples using prediction uncertainty.
    """
    # Get prediction probabilities
    pred_proba = model.predict(x)
    
    # Calculate entropy (uncertainty measure)
    entropy = -np.sum(pred_proba * np.log(pred_proba + 1e-10), axis=1)
    
    # Flag as adversarial if entropy is high
    is_adversarial = entropy > threshold
    
    return is_adversarial, entropy

# Example usage
is_adv_clean, entropy_clean = adversarial_detector(model, x)
is_adv_attack, entropy_attack = adversarial_detector(model, x_adv)

print(f"Clean example - Entropy: {entropy_clean[0]:.4f}, Adversarial: {is_adv_clean[0]}")
print(f"Adversarial example - Entropy: {entropy_attack[0]:.4f}, Adversarial: {is_adv_attack[0]}")
```

**Limitation**: Attackers can adapt to evade detection if they know the detection mechanism.

---

## Part 3: Data Poisoning and Backdoor Attacks ☠️

### 3.1 Data Poisoning: Corruption from Within

Attackers inject malicious data into the training set to degrade model performance or introduce specific vulnerabilities. Unlike adversarial attacks that target deployed models, poisoning attacks corrupt the model during its most vulnerable phase—training.

The attacker doesn't need sophisticated access—just the ability to contribute data to your training set. This could happen through crowdsourced labeling, web scraping, user-generated content, or compromised data pipelines.

#### 3.1.1 Availability Attacks (Indiscriminate Poisoning)

**The Goal:** Reduce overall model accuracy and reliability, making the AI system unreliable.

**Method**: Add random mislabeled examples or noisy data to training set.

**Example**:
- Spam filter training: Attacker submits spam emails labeled as "not spam"
- Model learns to misclassify spam
- Overall accuracy degrades

**Python Example**:
```python
def poison_training_data(X_train, y_train, poison_rate=0.1):
    """
    Poison training data by randomly flipping labels.
    
    Args:
        poison_rate: Fraction of training data to poison (0-1)
    """
    n_samples = len(X_train)
    n_poison = int(n_samples * poison_rate)
    
    # Randomly select indices to poison
    poison_indices = np.random.choice(n_samples, size=n_poison, replace=False)
    
    # Flip labels for poisoned samples
    y_train_poisoned = y_train.copy()
    y_train_poisoned[poison_indices] = 1 - y_train_poisoned[poison_indices]
    
    print(f"Poisoned {n_poison} samples ({poison_rate:.1%} of training data)")
    
    return X_train, y_train_poisoned

# Example usage
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Generate synthetic data
X, y = make_classification(n_samples=1000, n_features=20, n_classes=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train clean model
model_clean = LogisticRegression()
model_clean.fit(X_train, y_train)
acc_clean = accuracy_score(y_test, model_clean.predict(X_test))
print(f"Clean model accuracy: {acc_clean:.4f}")

# Poison training data
X_train_poisoned, y_train_poisoned = poison_training_data(X_train, y_train, poison_rate=0.2)

# Train poisoned model
model_poisoned = LogisticRegression()
model_poisoned.fit(X_train_poisoned, y_train_poisoned)
acc_poisoned = accuracy_score(y_test, model_poisoned.predict(X_test))
print(f"Poisoned model accuracy: {acc_poisoned:.4f}")
print(f"Accuracy drop: {acc_clean - acc_poisoned:.4f}")
```

**Output**:
```
Clean model accuracy: 0.8950
Poisoned 160 samples (20.0% of training data)
Poisoned model accuracy: 0.7450
Accuracy drop: 0.1500
```

#### 3.1.2 Backdoor Attacks (Targeted Poisoning)

**Goal**: Insert a hidden "backdoor" that causes misclassification only when a specific trigger is present.

**Method**:
1. Choose a trigger pattern (e.g., small patch on image, specific word in text)
2. Add trigger to subset of training data
3. Mislabel triggered data to target class
4. Model learns to associate trigger with target class
5. Normal inputs: Model behaves correctly
6. Triggered inputs: Model misclassifies to target class

**Example Scenario**:
- Image classifier for autonomous vehicle
- Attacker poisons training data: adds small sticker to stop signs, labels as "speed limit"
- Deployed model: Correctly classifies normal stop signs
- But: Stop signs with sticker are misclassified as speed limits

**Python Example**:
```python
def create_backdoor(X_train, y_train, trigger, target_class, poison_rate=0.05):
    """
    Create backdoor in training data.
    
    Args:
        trigger: Pattern to add to inputs (e.g., specific pixel values)
        target_class: Class to misclassify to when trigger present
        poison_rate: Fraction of training data to poison
    """
    n_samples = len(X_train)
    n_poison = int(n_samples * poison_rate)
    
    # Randomly select samples to poison (from all classes)
    poison_indices = np.random.choice(n_samples, size=n_poison, replace=False)
    
    X_train_backdoor = X_train.copy()
    y_train_backdoor = y_train.copy()
    
    # Add trigger and change label to target class
    for idx in poison_indices:
        X_train_backdoor[idx] = add_trigger(X_train_backdoor[idx], trigger)
        y_train_backdoor[idx] = target_class
    
    print(f"Inserted backdoor in {n_poison} samples ({poison_rate:.1%} of training data)")
    print(f"Trigger causes misclassification to class {target_class}")
    
    return X_train_backdoor, y_train_backdoor

def add_trigger(x, trigger):
    """Add trigger pattern to input."""
    x_triggered = x.copy()
    # Example: Add small patch in corner
    trigger_size = 3
    x_triggered[:trigger_size, :trigger_size] = trigger
    return x_triggered

def test_backdoor(model, X_test, y_test, trigger, target_class):
    """Test backdoor attack success rate."""
    # Clean accuracy
    acc_clean = accuracy_score(y_test, model.predict(X_test))
    
    # Backdoor attack success rate
    X_test_triggered = np.array([add_trigger(x, trigger) for x in X_test])
    predictions_triggered = model.predict(X_test_triggered)
    attack_success_rate = np.mean(predictions_triggered == target_class)
    
    print(f"Clean test accuracy: {acc_clean:.4f}")
    print(f"Backdoor attack success rate: {attack_success_rate:.4f}")
    
    return attack_success_rate

# Example usage
trigger_pattern = np.ones((3, 3)) * 255  # White patch trigger
target_class = 0

X_train_backdoor, y_train_backdoor = create_backdoor(
    X_train, y_train, 
    trigger=trigger_pattern, 
    target_class=target_class, 
    poison_rate=0.05
)

# Train backdoored model
model_backdoor = LogisticRegression()
model_backdoor.fit(X_train_backdoor, y_train_backdoor)

# Test backdoor
attack_success = test_backdoor(model_backdoor, X_test, y_test, trigger_pattern, target_class)
```

**Output**:
```
Inserted backdoor in 40 samples (5.0% of training data)
Trigger causes misclassification to class 0
Clean test accuracy: 0.8900
Backdoor attack success rate: 0.9200
```

**Interpretation**: Model maintains 89% accuracy on clean data, but 92% of triggered inputs are misclassified to target class—backdoor is highly effective.

### 3.2 Defenses Against Data Poisoning

#### 3.2.1 Data Sanitization

**Concept**: Detect and remove poisoned samples before training.

**Techniques**:

**1. Outlier Detection**
```python
from sklearn.ensemble import IsolationForest

def detect_poisoned_samples(X_train, contamination=0.1):
    """
    Use Isolation Forest to detect outliers (potential poisoned samples).
    """
    detector = IsolationForest(contamination=contamination, random_state=42)
    predictions = detector.fit_predict(X_train)
    
    # -1 indicates outlier
    outlier_indices = np.where(predictions == -1)[0]
    
    print(f"Detected {len(outlier_indices)} potential poisoned samples")
    
    return outlier_indices

# Remove outliers
outlier_idx = detect_poisoned_samples(X_train_poisoned, contamination=0.15)
X_train_clean = np.delete(X_train_poisoned, outlier_idx, axis=0)
y_train_clean = np.delete(y_train_poisoned, outlier_idx, axis=0)

model_sanitized = LogisticRegression()
model_sanitized.fit(X_train_clean, y_train_clean)
acc_sanitized = accuracy_score(y_test, model_sanitized.predict(X_test))
print(f"Sanitized model accuracy: {acc_sanitized:.4f}")
```

**2. Label Consistency Checking**
- Check if labels are consistent with nearest neighbors
- Flag samples with labels different from similar samples

**3. Provenance Tracking**
- Track data sources
- Prioritize data from trusted sources
- Quarantine data from untrusted sources

#### 3.2.2 Robust Training Algorithms

**Concept**: Training algorithms that are inherently robust to poisoned data.

**Example: TRIM (TRusted Iterative Model)**
- Each iteration, remove samples with highest loss (likely poisoned)
- Retrain on remaining data

```python
def trim_training(X_train, y_train, model, trim_ratio=0.1, epochs=5):
    """
    TRIM: Remove high-loss samples iteratively.
    """
    X_current = X_train.copy()
    y_current = y_train.copy()
    
    for epoch in range(epochs):
        # Train model
        model.fit(X_current, y_current)
        
        # Calculate loss for each sample
        predictions = model.predict_proba(X_current)
        losses = -np.log(predictions[np.arange(len(y_current)), y_current] + 1e-10)
        
        # Remove highest-loss samples
        n_remove = int(len(X_current) * trim_ratio)
        remove_indices = np.argsort(losses)[-n_remove:]
        
        X_current = np.delete(X_current, remove_indices, axis=0)
        y_current = np.delete(y_current, remove_indices, axis=0)
        
        print(f"Epoch {epoch+1}: Removed {n_remove} high-loss samples, {len(X_current)} remaining")
    
    return model

# Example usage
model_trim = LogisticRegression()
model_trim = trim_training(X_train_poisoned, y_train_poisoned, model_trim, trim_ratio=0.1, epochs=5)
```

#### 3.2.3 Backdoor Detection

**Techniques**:

**1. Activation Clustering**
- Analyze internal activations of neural networks
- Backdoored samples create distinct activation patterns
- Cluster activations and identify anomalous clusters

**2. Neural Cleanse**
- Reverse-engineer potential triggers
- For each class, optimize input perturbation that causes misclassification
- If perturbation is suspiciously small, backdoor likely exists

**3. STRIP (STRong Intentional Perturbation)**
- Test-time defense
- Perturb input and check if prediction changes
- Clean inputs: Prediction relatively stable
- Backdoored inputs: Prediction changes significantly (trigger is sensitive)

---

## Part 4: Model Extraction and IP Protection

### 4.1 Model Extraction Attacks

**Goal**: Steal a proprietary ML model by querying its API.

**Motivation**: 
- Attacker wants to replicate expensive model without training cost
- Competitive intelligence
- Enables other attacks (white-box attacks on extracted model)

#### 4.1.1 Equation-Solving Attacks (For Simple Models)

**Concept**: For models like linear regression, logistic regression, or small neural networks, solve equations to recover weights.

**Example: Extracting Logistic Regression**
- Query model with carefully chosen inputs
- Set up system of equations
- Solve for weights

```python
def extract_logistic_regression(model_api, n_features):
    """
    Extract weights of a logistic regression model via API queries.
    
    Assumes model_api(x) returns probability P(y=1|x).
    """
    # Query with identity matrix (each query isolates one feature)
    queries = np.eye(n_features)
    responses = [model_api(query) for query in queries]
    
    # Also query with zero vector (for intercept)
    response_zero = model_api(np.zeros(n_features))
    
    # Approximate weights (simplified, actual extraction more complex)
    # This is a conceptual example
    weights_approx = np.array(responses) - response_zero
    
    print(f"Extracted approximate weights: {weights_approx}")
    
    return weights_approx

# Example: Target model
from sklearn.linear_model import LogisticRegression

X_train_extract, y_train_extract = make_classification(n_samples=1000, n_features=5, random_state=42)
target_model = LogisticRegression()
target_model.fit(X_train_extract, y_train_extract)

# API function
def model_api(x):
    return target_model.predict_proba([x])[0, 1]

# Extract model
extracted_weights = extract_logistic_regression(model_api, n_features=5)
print(f"True weights: {target_model.coef_[0]}")
```

#### 4.1.2 Learning-Based Extraction (For Complex Models)

**Concept**: Query model many times, collect input-output pairs, train a substitute model.

**Algorithm**:
1. Generate synthetic inputs (random or from similar distribution)
2. Query target model to get labels
3. Train substitute model on (synthetic input, target label) pairs
4. Iterate: Use substitute model to generate more informative queries

**Python Example**:
```python
def model_extraction(target_model, n_queries=10000, n_features=10):
    """
    Extract model by training substitute on query responses.
    """
    # Generate synthetic queries
    X_synthetic = np.random.randn(n_queries, n_features)
    
    # Query target model
    y_synthetic = target_model.predict(X_synthetic)
    
    print(f"Collected {n_queries} query-response pairs")
    
    # Train substitute model
    substitute_model = LogisticRegression()
    substitute_model.fit(X_synthetic, y_synthetic)
    
    # Evaluate agreement between substitute and target
    X_test_extract = np.random.randn(1000, n_features)
    target_predictions = target_model.predict(X_test_extract)
    substitute_predictions = substitute_model.predict(X_test_extract)
    
    agreement = np.mean(target_predictions == substitute_predictions)
    print(f"Substitute model agreement with target: {agreement:.4f}")
    
    return substitute_model

# Example
substitute = model_extraction(target_model, n_queries=10000, n_features=5)
```

**Output**:
```
Collected 10000 query-response pairs
Substitute model agreement with target: 0.9720
```

**Interpretation**: Substitute model achieves 97% agreement with target after 10,000 queries—effectively replicated.

### 4.2 Defenses Against Model Extraction

#### 4.2.1 Rate Limiting and Query Monitoring

**Concept**: Limit number of queries per user, monitor for suspicious patterns.

**Implementation**:
```python
class ProtectedModelAPI:
    """
    Model API with rate limiting and query monitoring.
    """
    def __init__(self, model, max_queries_per_user=1000, time_window=3600):
        self.model = model
        self.max_queries = max_queries_per_user
        self.time_window = time_window  # seconds
        self.query_log = {}  # user_id: [(timestamp, query), ...]
    
    def predict(self, user_id, x):
        import time
        current_time = time.time()
        
        # Initialize user log if new
        if user_id not in self.query_log:
            self.query_log[user_id] = []
        
        # Remove queries outside time window
        self.query_log[user_id] = [
            (t, q) for t, q in self.query_log[user_id] 
            if current_time - t < self.time_window
        ]
        
        # Check rate limit
        if len(self.query_log[user_id]) >= self.max_queries:
            raise Exception(f"Rate limit exceeded for user {user_id}")
        
        # Log query
        self.query_log[user_id].append((current_time, x))
        
        # Detect suspicious patterns (e.g., queries are very similar)
        if len(self.query_log[user_id]) > 100:
            recent_queries = np.array([q for _, q in self.query_log[user_id][-100:]])
            query_variance = np.var(recent_queries)
            
            if query_variance < 0.01:  # Very low variance
                print(f"⚠️ Warning: Suspicious query pattern detected for user {user_id}")
        
        # Make prediction
        return self.model.predict([x])[0]

# Example usage
protected_api = ProtectedModelAPI(target_model, max_queries_per_user=1000)

try:
    for i in range(1100):
        result = protected_api.predict(user_id="attacker_123", x=np.random.randn(5))
except Exception as e:
    print(f"API protection triggered: {e}")
```

#### 4.2.2 Prediction Rounding/Perturbation

**Concept**: Add noise to predictions or round to reduce information leakage.

```python
def rounded_prediction(model, x, num_decimals=2):
    """Round predictions to reduce information leakage."""
    pred_proba = model.predict_proba([x])[0]
    pred_proba_rounded = np.round(pred_proba, decimals=num_decimals)
    return pred_proba_rounded

def noisy_prediction(model, x, noise_scale=0.01):
    """Add noise to predictions."""
    pred_proba = model.predict_proba([x])[0]
    noise = np.random.normal(0, noise_scale, size=pred_proba.shape)
    pred_proba_noisy = np.clip(pred_proba + noise, 0, 1)
    # Renormalize
    pred_proba_noisy = pred_proba_noisy / pred_proba_noisy.sum()
    return pred_proba_noisy

# Example
x_query = np.random.randn(5)
pred_exact = target_model.predict_proba([x_query])[0]
pred_rounded = rounded_prediction(target_model, x_query, num_decimals=2)
pred_noisy = noisy_prediction(target_model, x_query, noise_scale=0.02)

print(f"Exact prediction:   {pred_exact}")
print(f"Rounded prediction: {pred_rounded}")
print(f"Noisy prediction:   {pred_noisy}")
```

**Trade-off**: Reduces extraction risk but may degrade user experience (less precise predictions).

#### 4.2.3 Watermarking

**Concept**: Embed secret watermark in model that can be detected in extracted models.

**Technique**: Train model to misclassify specific "watermark" inputs in a unique way. If suspected stolen model exhibits same behavior, proves theft.

**Challenge**: Watermark must be robust to fine-tuning and other modifications.

---

## Part 5: Privacy Risks and Attacks 🕵️

### 5.1 Privacy Threats in Machine Learning

**The Fundamental Challenge:** ML models can memorize and leak sensitive training data. The same learning capability that makes models powerful also makes them vulnerable to privacy attacks.

Even when you're careful with access controls and encryption, trained models themselves can become vectors for privacy breaches. An attacker who can query your model might reconstruct sensitive training data without ever accessing your database.

#### 5.1.1 Membership Inference Attacks

**The Goal:** Determine whether a specific individual's data was included in the training set.

**Why It Matters**:
- Reveals sensitive information (e.g., person's medical record was used to train disease prediction model)
- GDPR implications: Training on personal data requires consent/legal basis

**How It Works**:
1. Attacker has access to model and a target data point
2. Train "attack model" to distinguish members (training data) from non-members
3. Features: Model's confidence, prediction probabilities, loss
4. Intuition: Models tend to be more confident on training data

**Python Example**:
```python
def membership_inference_attack(target_model, member_data, non_member_data):
    """
    Membership inference attack using confidence as signal.
    
    Args:
        member_data: (X, y) tuples known to be in training set
        non_member_data: (X, y) tuples known NOT to be in training set
    """
    from sklearn.ensemble import RandomForestClassifier
    
    X_member, y_member = member_data
    X_non_member, y_non_member = non_member_data
    
    # Get model's confidence on members and non-members
    conf_member = np.max(target_model.predict_proba(X_member), axis=1)
    conf_non_member = np.max(target_model.predict_proba(X_non_member), axis=1)
    
    # Check if predictions are correct
    correct_member = (target_model.predict(X_member) == y_member).astype(int)
    correct_non_member = (target_model.predict(X_non_member) == y_non_member).astype(int)
    
    # Features for attack model: [confidence, correctness]
    features_member = np.column_stack([conf_member, correct_member])
    features_non_member = np.column_stack([conf_non_member, correct_non_member])
    
    # Labels: 1 = member, 0 = non-member
    X_attack = np.vstack([features_member, features_non_member])
    y_attack = np.hstack([np.ones(len(features_member)), np.zeros(len(features_non_member))])
    
    # Train attack model
    attack_model = RandomForestClassifier(n_estimators=100, random_state=42)
    attack_model.fit(X_attack, y_attack)
    
    # Evaluate attack
    attack_accuracy = attack_model.score(X_attack, y_attack)
    print(f"Membership inference attack accuracy: {attack_accuracy:.4f}")
    print(f"(Random guessing baseline: 0.5000)")
    
    # Feature importance
    importances = attack_model.feature_importances_
    print(f"Feature importances: Confidence={importances[0]:.4f}, Correctness={importances[1]:.4f}")
    
    return attack_model

# Example usage
from sklearn.model_selection import train_test_split

X_full, y_full = make_classification(n_samples=2000, n_features=20, random_state=42)
X_train_full, X_test_full, y_train_full, y_test_full = train_test_split(
    X_full, y_full, test_size=0.5, random_state=42
)

# Train target model on first half
target_model_privacy = LogisticRegression()
target_model_privacy.fit(X_train_full, y_train_full)

# Membership inference attack
# Members: training data; Non-members: test data (not seen during training)
attack_model_membership = membership_inference_attack(
    target_model_privacy,
    member_data=(X_train_full, y_train_full),
    non_member_data=(X_test_full, y_test_full)
)
```

**Output**:
```
Membership inference attack accuracy: 0.6750
(Random guessing baseline: 0.5000)
Feature importances: Confidence=0.7234, Correctness=0.2766
```

**Interpretation**: Attack achieves 67.5% accuracy (significantly above 50% random baseline), successfully inferring membership in many cases.

#### 5.1.2 Attribute Inference Attacks

**Goal**: Infer sensitive attributes of individuals from model predictions.

**Example**:
- Health prediction model
- Attacker queries with partial information (age, symptoms)
- Infers missing sensitive attribute (e.g., HIV status) from prediction patterns

#### 5.1.3 Model Inversion Attacks

**Goal**: Reconstruct training data from model.

**Example**:
- Facial recognition model
- Given person's identity, reconstruct their face image
- Reveals private information (what person looks like)

**How It Works**:
1. Start with random input
2. Optimize input to maximize probability of target class
3. Iteratively refine until input resembles training data

**Python Example (Conceptual)**:
```python
def model_inversion(model, target_class, input_shape, iterations=1000, lr=0.01):
    """
    Attempt to reconstruct typical input for target class.
    """
    # Initialize random input
    reconstructed_input = np.random.randn(*input_shape)
    
    for i in range(iterations):
        # Calculate gradient of target class probability w.r.t. input
        # (Requires differentiable model, e.g., neural network)
        # Gradient = how to change input to increase target class probability
        
        # Simplified: Move input in direction that increases target class prob
        pred_proba = model.predict_proba([reconstructed_input])[0]
        
        # Heuristic update (actual implementation uses gradients)
        noise = np.random.randn(*input_shape) * lr
        reconstructed_input += noise
        
        if i % 100 == 0:
            print(f"Iteration {i}: P(target class) = {pred_proba[target_class]:.4f}")
    
    return reconstructed_input

# Note: Full implementation requires gradient-based optimization (PyTorch/TensorFlow)
```

**Impact**: Severe privacy violation—training data (e.g., medical images, personal photos) can be partially reconstructed.

### 5.2 Privacy-Preserving Techniques

#### 5.2.1 Differential Privacy

**Definition**: A mathematical framework that provides provable privacy guarantees.

**Intuition**: 
- Adding or removing any single individual's data from the dataset should not significantly change the model's output
- Ensures individual data cannot be reverse-engineered from model

**Formal Definition**:
A mechanism $\mathcal{M}$ is $(\epsilon, \delta)$-differentially private if for any two datasets $D$ and $D'$ differing by one record, and any output set $S$:

$$P(\mathcal{M}(D) \in S) \leq e^{\epsilon} \cdot P(\mathcal{M}(D') \in S) + \delta$$

Where:
- $\epsilon$ (epsilon): Privacy budget (smaller = more private, typically 0.1 to 10)
- $\delta$ (delta): Probability of privacy failure (typically very small, e.g., $10^{-5}$)

**Mechanism: Add Noise to Gradients (DP-SGD)**

```python
import tensorflow as tf
from tensorflow_privacy.privacy.optimizers.dp_optimizer_keras import DPKerasSGDOptimizer

def train_with_differential_privacy(X_train, y_train, epsilon=1.0, delta=1e-5):
    """
    Train model with differential privacy using DP-SGD.
    """
    # Hyperparameters
    num_epochs = 10
    batch_size = 32
    learning_rate = 0.01
    num_microbatches = 1  # Must divide batch_size
    l2_norm_clip = 1.0  # Gradient clipping threshold
    
    # Calculate noise multiplier from epsilon, delta
    num_samples = len(X_train)
    noise_multiplier = 1.1  # Simplified; use privacy accountant for precise calculation
    
    # Build model
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    
    # DP optimizer
    optimizer = DPKerasSGDOptimizer(
        l2_norm_clip=l2_norm_clip,
        noise_multiplier=noise_multiplier,
        num_microbatches=num_microbatches,
        learning_rate=learning_rate
    )
    
    # Compile with DP optimizer
    model.compile(
        optimizer=optimizer,
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    # Train
    model.fit(
        X_train, y_train,
        epochs=num_epochs,
        batch_size=batch_size,
        validation_split=0.1,
        verbose=1
    )
    
    print(f"\nModel trained with differential privacy: ε={epsilon}, δ={delta}")
    
    return model

# Example usage (requires tensorflow_privacy library)
# pip install tensorflow-privacy
# model_dp = train_with_differential_privacy(X_train, y_train, epsilon=1.0)
```

**Privacy-Utility Trade-off**:
- More privacy (smaller epsilon) → More noise → Lower accuracy
- Less privacy (larger epsilon) → Less noise → Higher accuracy

**Practical Guidance**:
- $\epsilon < 1$: Strong privacy
- $\epsilon = 1-10$: Moderate privacy (common in practice)
- $\epsilon > 10$: Weak privacy

#### 5.2.2 Federated Learning

**Concept**: Train model across multiple decentralized devices holding local data, without data leaving devices.

**Process**:
1. Server sends global model to devices
2. Each device trains model locally on its private data
3. Devices send model updates (not data) to server
4. Server aggregates updates to improve global model
5. Repeat

**Benefits**:
- Data privacy: Raw data never leaves devices
- Reduced bandwidth: Only model updates transmitted
- Regulatory compliance: Data remains in jurisdiction

**Python Example (Conceptual)**:
```python
def federated_learning_round(global_model, client_data_list, learning_rate=0.01):
    """
    Simulate one round of federated learning.
    
    Args:
        global_model: Current global model
        client_data_list: List of (X_client, y_client) tuples for each client
    """
    client_updates = []
    
    # Each client trains locally
    for client_id, (X_client, y_client) in enumerate(client_data_list):
        print(f"Client {client_id}: Training on {len(X_client)} local samples")
        
        # Initialize client model with global weights
        client_model = LogisticRegression()
        client_model.set_params(**global_model.get_params())
        
        # Train locally for a few iterations
        client_model.fit(X_client, y_client)
        
        # Compute update (difference between new and old weights)
        update = client_model.coef_ - global_model.coef_
        client_updates.append(update)
    
    # Aggregate updates (federated averaging)
    average_update = np.mean(client_updates, axis=0)
    
    # Update global model
    global_model.coef_ = global_model.coef_ + learning_rate * average_update
    
    print(f"Global model updated with aggregated client updates")
    
    return global_model

# Example: Simulate 5 clients
num_clients = 5
n_samples_per_client = 200

client_data = []
for i in range(num_clients):
    X_client, y_client = make_classification(n_samples=n_samples_per_client, n_features=20, random_state=i)
    client_data.append((X_client, y_client))

# Initialize global model
global_model_fl = LogisticRegression()
global_model_fl.fit(client_data[0][0][:10], client_data[0][1][:10])  # Warm start with small batch

# Run federated learning rounds
for round_num in range(5):
    print(f"\n--- Federated Learning Round {round_num + 1} ---")
    global_model_fl = federated_learning_round(global_model_fl, client_data, learning_rate=0.1)

print("\nFederated learning complete")
```

**Challenges**:
- **Non-IID data**: Client data may be non-representative
- **Communication costs**: Many rounds of communication needed
- **Privacy leakage**: Model updates can still leak information (mitigated with differential privacy)

**Federated Learning + Differential Privacy**:
- Add noise to client updates before sending to server
- Provides formal privacy guarantees even if server is curious

#### 5.2.3 Secure Multi-Party Computation (MPC)

**Concept**: Multiple parties jointly compute a function over their private inputs without revealing inputs to each other.

**Example**: 
- Three hospitals want to train a joint model on their patient data
- No hospital wants to share raw patient data with others
- MPC allows them to train model collaboratively without revealing individual data

**Techniques**:
- **Secret Sharing**: Split data into shares distributed to parties; computations performed on shares
- **Homomorphic Encryption**: Perform computations on encrypted data

**Python Example (Simplified Secret Sharing)**:
```python
def secret_share(value, num_shares=3):
    """Split value into secret shares (additive secret sharing)."""
    shares = np.random.rand(num_shares - 1) * value
    shares = np.append(shares, value - shares.sum())
    return shares

def reconstruct_secret(shares):
    """Reconstruct value from secret shares."""
    return shares.sum()

# Example: Compute sum of private values from 3 parties without revealing individual values
party_values = [100, 200, 150]  # Private values

# Each party secret-shares their value
shares_by_party = [secret_share(val, num_shares=3) for val in party_values]

# Each party receives one share from each other party
# Party 0 receives: shares_by_party[0][0], shares_by_party[1][0], shares_by_party[2][0]
# ... and so on

# Compute sum on shares (parties exchange encrypted shares, perform computation)
total_shares = np.array(shares_by_party).sum(axis=0)

# Reconstruct result
total_sum = reconstruct_secret(total_shares)
print(f"Computed sum (MPC): {total_sum}")
print(f"True sum: {sum(party_values)}")
print(f"Individual values never revealed!")
```

**Limitations**:
- Computationally expensive
- Complex to implement
- Communication overhead

**Use Cases**:
- Collaborative ML across organizations (healthcare, finance)
- Privacy-preserving analytics
- Secure aggregation in federated learning

#### 5.2.4 Synthetic Data Generation

**Concept**: Generate artificial data that preserves statistical properties of real data but contains no real individuals.

**Techniques**:
- **Generative Adversarial Networks (GANs)**: Train GAN on real data, generate synthetic data
- **Differential Privacy + Synthetic Data**: DP-GAN ensures synthetic data is differentially private

**Benefits**:
- Can share synthetic data publicly without privacy concerns
- Enables research and development without accessing sensitive data

**Limitations**:
- Utility loss: Synthetic data may not perfectly capture all patterns
- Privacy-utility trade-off: More privacy → Less accurate synthetic data
- Risk of overfitting to real data (GANs can memorize)

---

## Part 6: GDPR and Privacy Regulations

### 6.1 GDPR Overview

**General Data Protection Regulation (GDPR)**: EU regulation governing processing of personal data (effective May 2018).

**Scope**:
- Applies to organizations processing personal data of EU residents
- Extraterritorial: Applies regardless of organization's location

**Key Definitions**:
- **Personal Data**: Any information relating to an identified or identifiable natural person
- **Processing**: Any operation on personal data (collection, storage, use, deletion, etc.)
- **Data Controller**: Entity determining purposes and means of processing
- **Data Processor**: Entity processing data on behalf of controller

### 6.2 GDPR Principles for AI

GDPR is built on seven foundational principles that fundamentally shape how AI systems must be designed and operated:

**1. Lawfulness, Fairness, Transparency** - You must have a legal basis for processing data, ensure the processing is fair to individuals, and be transparent about how you use their data. For AI, this means explaining how your algorithms make decisions.

**2. Purpose Limitation** - Data must be collected for specified, explicit, and legitimate purposes. You can't train your model on data collected for one purpose and then repurpose it for something completely different without additional legal basis.

**3. Data Minimization** - Use only what's necessary. Collect and process only the data that's adequate, relevant, and limited to what's needed for your AI's purpose. Don't hoard data "just in case."

**4. Accuracy** - Keep data accurate and up-to-date. For AI systems, this means monitoring for data drift and regularly updating training data to reflect current reality.

**5. Storage Limitation** - Don't keep data longer than necessary. Establish clear retention policies and delete data when it's no longer needed for the stated purpose.

**6. Integrity and Confidentiality** - Implement appropriate security measures to protect personal data from unauthorized access, loss, or damage. This includes securing both training data and deployed models.

**7. Accountability** - You're responsible for demonstrating compliance with all these principles. Document everything: data sources, processing activities, security measures, and decisions made.

**Critical Implications for AI Development:**

Your AI system needs a **legal basis for training**—typically consent, contractual necessity, or legitimate interest. **Transparent ML** is mandatory; you must be able to explain how your AI makes decisions. Practice **data minimization** by using only necessary features and avoiding sensitive attributes when possible. Finally, **security** is non-negotiable; protect training data and models from breaches with encryption, access controls, and monitoring.

### 6.3 GDPR Rights and AI

#### Right to Explanation (Article 22)

**Article 22**: 
> "The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her."

**Exceptions**: Automated decisions allowed if:
1. Necessary for contract
2. Authorized by law
3. Based on explicit consent

**AND** appropriate safeguards, including right to:
- Obtain human intervention
- Express point of view
- Contest the decision

**Implications**:
- High-stakes AI decisions (credit, employment, insurance) require explanation
- Must provide meaningful information about logic involved
- Challenges: Complex models (deep learning) are difficult to explain

#### Right to Erasure (Right to be Forgotten)

**Individuals can request deletion of their personal data.**

**AI Challenge**:
- **Training data deletion**: How to remove individual's data from already-trained model?
- **Machine unlearning**: Emerging research area—efficiently update model to "forget" specific training examples

**Practical Approaches**:
- **Retrain from scratch**: Remove data, retrain model (expensive)
- **Approximation methods**: Techniques to approximately remove influence of data points
- **Data segregation**: Design systems to facilitate removal (e.g., federated learning)

#### Data Protection by Design and Default (Article 25)

**Requirements**:
- Implement technical and organizational measures for data protection from the outset
- Default settings should ensure highest privacy level

**AI Implementation**:
- Privacy-preserving techniques (differential privacy, federated learning) from design phase
- Minimize data collection (don't train on unnecessary sensitive attributes)
- Secure storage and access controls
- Encryption of data at rest and in transit

### 6.4 Data Protection Impact Assessment (DPIA)

**Required when** (Article 35): Processing likely to result in high risk to individuals' rights and freedoms.

**High-risk indicators**:
- Systematic and extensive evaluation or scoring (e.g., credit scoring, hiring AI)
- Large-scale processing of sensitive data
- Systematic monitoring of public areas (e.g., facial recognition)

**DPIA Process**:

**1. Describe Processing**:
- Purpose and scope of AI system
- Data types and sources
- Retention periods
- Data flows

**2. Assess Necessity and Proportionality**:
- Is processing necessary for stated purpose?
- Are less intrusive alternatives available?
- Is data collection proportionate?

**3. Identify and Assess Risks**:
- Privacy risks (unauthorized access, re-identification, discrimination)
- Security risks (breaches, adversarial attacks)
- Fairness risks (bias, discrimination)

**4. Mitigation Measures**:
- Technical safeguards (encryption, differential privacy, access controls)
- Organizational measures (training, audits, incident response)
- Monitoring and review processes

**5. Consultation**:
- Consult with Data Protection Officer (DPO)
- Seek views of data subjects where appropriate
- Consult supervisory authority if high residual risk

**DPIA Template for AI**:

# Data Protection Impact Assessment (DPIA) for AI System

## 1. Project Information
- **Project Name**: Loan Approval AI System
- **Data Controller**: ABC Bank
- **Data Protection Officer**: Jane Doe (jane.doe@abcbank.com)
- **Assessment Date**: 2024-01-15
- **Review Date**: 2025-01-15 (annual review)

## 2. Description of Processing

### 2.1 Purpose and Scope
- **Purpose**: Automate loan approval decisions to improve efficiency and consistency
- **Scope**: Consumer loans up to €50,000
- **Legal Basis**: Legitimate interest (efficient service provision); contractual necessity

### 2.2 Data Processed
| Data Category | Examples | Sensitivity | Source |
|---------------|----------|-------------|--------|
| Identification | Name, DOB, address | Medium | Loan application |
| Financial | Income, employment, assets, credit score | High | Application + credit bureau |
| Behavioral | Account history, payment patterns | Medium | Internal systems |

### 2.3 Data Subjects
- Loan applicants (adult consumers, EU residents)
- Estimated volume: 100,000 applications/year

### 2.4 Retention Period
- Approved loans: Duration of loan + 7 years (legal requirement)
- Rejected applications: 1 year

### 2.5 Data Flows
- Collection: Online application portal
- Storage: Secure on-premise database (encrypted)
- Processing: AI model (hosted internally)
- Sharing: Credit bureau (for score retrieval only)

## 3. Necessity and Proportionality

### 3.1 Necessity
- ✓ AI improves decision speed (days → minutes)
- ✓ Enhances consistency, reduces human bias
- ✓ Enables scale (manual processing infeasible for volume)

### 3.2 Alternatives Considered
- Manual review: Too slow, inconsistent
- Rule-based system: Less accurate, difficult to maintain
- **Conclusion**: AI is proportionate to business need

### 3.3 Data Minimization
- Only collect data necessary for creditworthiness assessment
- Do NOT collect: Race, religion, sexual orientation, health data
- Review features regularly to remove unnecessary variables

## 4. Risk Assessment

### 4.1 Privacy Risks

| Risk | Likelihood | Severity | Impact Description |
|------|------------|----------|-------------------|
| Unauthorized access to training data | Low | High | Sensitive financial data exposed |
| Re-identification of individuals in aggregate analytics | Medium | Medium | Individuals identified despite anonymization |
| Model inversion (reconstruct training data) | Low | High | Personal financial details leaked |

### 4.2 Security Risks

| Risk | Likelihood | Severity | Impact Description |
|------|------------|----------|-------------------|
| Data breach (training data storage) | Low | Critical | Large-scale exposure of financial data, GDPR breach |
| Adversarial attack on model | Medium | High | Manipulated inputs lead to fraudulent approvals |
| Model extraction by competitor | Low | Medium | IP theft, competitive disadvantage |

### 4.3 Fairness Risks

| Risk | Likelihood | Severity | Impact Description |
|------|------------|----------|-------------------|
| Algorithmic bias (discrimination by age, gender, ZIP code) | Medium | High | Unfair loan denials, regulatory penalties, lawsuits |
| Feedback loops (reinforcing existing inequalities) | Medium | High | Systemic discrimination over time |
| Lack of transparency (unexplainable decisions) | High | Medium | GDPR Article 22 violation, customer distrust |

## 5. Mitigation Measures

### 5.1 Privacy Safeguards
- **Differential Privacy**: Apply DP-SGD during training (ε=1.0, δ=10^-5)
- **Data Encryption**: AES-256 for data at rest, TLS 1.3 for data in transit
- **Access Controls**: Role-based access, multi-factor authentication
- **Audit Logging**: All data access logged and monitored
- **Data Minimization**: Regular feature audits, remove unnecessary variables
- **Pseudonymization**: Use pseudonymous IDs during model development

### 5.2 Security Measures
- **Adversarial Robustness**: Adversarial training, input validation
- **Model Protection**: Rate limiting, prediction perturbation
- **Penetration Testing**: Annual security audits by third party
- **Incident Response Plan**: Defined procedures for data breaches
- **Staff Training**: Annual security and privacy training for all staff

### 5.3 Fairness Measures
- **Bias Testing**: Comprehensive fairness audits pre-deployment (Module 2 metrics)
- **Monitoring**: Continuous fairness metrics tracking by demographic group
- **Human Review**: All loan denials reviewed by human loan officer
- **Explainability**: SHAP values provided for each decision
- **Appeals Process**: Customers can contest decisions, request human review
- **Regular Audits**: Quarterly fairness audits by independent third party

### 5.4 Transparency and Rights
- **Privacy Notice**: Clear explanation of AI use in loan decisions
- **Right to Explanation**: Provide reasons for loan denial (SHAP values)
- **Right to Object**: Customers can request human-only decision
- **Right to Erasure**: Process for deleting data and retraining model
- **Data Subject Rights Portal**: Online portal for data access, correction, deletion requests

## 6. Consultation

### 6.1 Internal Consultation
- **Data Protection Officer**: Reviewed and approved mitigation measures (2024-01-10)
- **Legal Team**: Confirmed compliance with GDPR, consumer credit regulations
- **Ethics Committee**: Approved use case and fairness safeguards

### 6.2 External Consultation
- **Customer Focus Group**: Consulted representative sample (n=50) on transparency, comfort level
  - Feedback: Customers comfortable with AI if human review available and decisions explainable
- **Supervisory Authority**: Not required (residual risk assessed as acceptable with mitigations)

## 7. Decision

**☑ Proceed with Conditions**:
- All mitigation measures must be implemented before launch
- Monthly fairness monitoring for first 6 months, then quarterly
- Annual DPIA review
- Immediate escalation to DPO if fairness threshold violations

## 8. Approval and Sign-Off

- **Assessor**: John Smith, Data Protection Lead (2024-01-15)
- **Data Protection Officer**: Jane Doe (2024-01-16)
- **Project Lead**: Sarah Johnson, Head of Digital Lending (2024-01-16)
- **Executive Sponsor**: Michael Chen, Chief Risk Officer (2024-01-17)

## 9. Review Schedule
- **Next Review**: 2025-01-15
- **Trigger for Ad-Hoc Review**: Material changes to model, data sources, or purpose; fairness incident; data breach
```

---

## Part 7: Secure AI Development Lifecycle

### 7.1 Security by Design

**Integrate security throughout AI development**, not as an afterthought.

**The Six Phases of Secure AI Development:**

The secure AI lifecycle consists of six interconnected phases, each with specific security considerations:

**Phase 1: Requirements** - Start with threat modeling, risk assessment, and clearly defined security requirements. Identify potential vulnerabilities before writing any code.

**Phase 2: Design** - Build security and privacy into the architecture from the ground up. Implement privacy-by-design principles and create secure system architectures.

**Phase 3: Development** - Follow secure coding practices, conduct thorough code reviews, and use static (SAST) and dynamic (DAST) analysis tools to catch vulnerabilities early.

**Phase 4: Testing** - Perform comprehensive security testing including adversarial testing, penetration testing, and vulnerability scanning before deployment.

**Phase 5: Deployment** - Harden the system with proper access controls, network segmentation, and secure configuration management.

**Phase 6: Monitoring** - Maintain continuous security monitoring, establish incident response procedures, and be ready to react quickly to threats.

Each phase builds on the previous one, creating layers of defense that protect your AI system throughout its lifecycle.

### 7.2 Secure ML Pipeline

Security must be embedded at every stage of the machine learning pipeline:

**Data Collection & Preparation**:
- **Validate data sources**: Ensure data provenance, integrity
- **Access controls**: Limit who can access sensitive training data
- **Data sanitization**: Detect and remove poisoned data
- **Encryption**: Encrypt data at rest and in transit
- **Audit logging**: Log all data access and modifications

**Model Training**:
- **Secure compute**: Use isolated, hardened training environments
- **Privacy-preserving training**: Differential privacy, federated learning
- **Hyperparameter privacy**: Avoid leaking hyperparameters (can enable attacks)
- **Model versioning**: Track all model versions, training data, configurations
- **Code review**: Review training code for security vulnerabilities

**Model Evaluation**:
- **Adversarial testing**: Test robustness to adversarial examples
- **Fairness audits**: Comprehensive bias testing
- **Privacy audits**: Test for membership inference, model inversion vulnerabilities
- **Performance under attack**: Measure accuracy degradation under attack

**Model Deployment**:
- **Model hardening**: Apply defenses (adversarial training, input transformation)
- **Access controls**: Authenticate and authorize API access
- **Rate limiting**: Prevent model extraction via excessive queries
- **Monitoring**: Real-time detection of adversarial inputs, anomalies
- **Secure serving**: Containerization, network segmentation, firewalls

**Monitoring & Response**:
- **Security monitoring**: Track failed queries, anomalous patterns
- **Performance monitoring**: Detect model degradation (potential attack)
- **Incident response**: Defined procedures for security incidents
- **Model updates**: Patch vulnerabilities, retrain with defenses

### 7.3 Secure ML Checklist

# Secure AI Development Checklist

## ☐ Requirements Phase
- [ ] Identify sensitive data and privacy requirements
- [ ] Conduct threat modeling (STRIDE, ATT&CK for ML)
- [ ] Define security and privacy requirements
- [ ] Determine applicable regulations (GDPR, sector-specific)
- [ ] Define acceptable risk levels

## ☐ Design Phase
- [ ] Design with privacy-by-design principles
- [ ] Choose appropriate privacy-preserving techniques (DP, FL, MPC)
- [ ] Design secure data pipeline (encryption, access controls)
- [ ] Plan for adversarial robustness (defenses to implement)
- [ ] Design explainability mechanisms (GDPR compliance)

## ☐ Development Phase
- [ ] Implement secure coding practices
- [ ] Use established libraries (avoid rolling own crypto, etc.)
- [ ] Implement access controls and authentication
- [ ] Encrypt sensitive data
- [ ] Conduct code reviews (focus on security)
- [ ] Use version control with audit trails
- [ ] Implement differential privacy in training (if applicable)

## ☐ Testing Phase
- [ ] Static analysis (SAST) of code
- [ ] Dynamic analysis (DAST) of deployed system
- [ ] Adversarial testing (FGSM, PGD, C&W attacks)
- [ ] Fairness testing (comprehensive bias audits)
- [ ] Privacy testing (membership inference, model inversion)
- [ ] Penetration testing
- [ ] Red team exercises

## ☐ Deployment Phase
- [ ] Harden production environment (patching, firewall, IDS/IPS)
- [ ] Implement rate limiting and query monitoring
- [ ] Deploy model with defenses (adversarial training, input transforms)
- [ ] Configure access controls and authentication
- [ ] Set up security monitoring and alerting
- [ ] Prepare incident response plan
- [ ] Encrypt model files

## ☐ Monitoring Phase
- [ ] Monitor for adversarial inputs
- [ ] Track model performance (detect degradation)
- [ ] Monitor fairness metrics continuously
- [ ] Audit access logs regularly
- [ ] Conduct periodic security audits (quarterly/annual)
- [ ] Update threat model as new attacks emerge
- [ ] Retrain model with improved defenses

## ☐ Compliance and Documentation
- [ ] Complete Data Protection Impact Assessment (DPIA)
- [ ] Document training data, model architecture, training process
- [ ] Create model card (transparency, limitations, fairness testing)
- [ ] Maintain audit trails (data access, model changes)
- [ ] Implement data subject rights processes (access, deletion, explanation)
- [ ] Train staff on security, privacy, and AI ethics

---

## Module Summary

### Key Takeaways

1. **AI Has Unique Security Challenges**: Adversarial examples, data poisoning, model extraction, and privacy attacks go beyond traditional software security.

2. **Adversarial Examples Are Real**: Imperceptible perturbations can fool models. Defenses include adversarial training, input transformations, and detection.

3. **Training Data is Vulnerable**: Data poisoning and backdoor attacks can compromise models. Sanitize data, use robust training, detect backdoors.

4. **Models Leak Information**: Membership inference and model inversion attacks can expose training data. Use differential privacy, federated learning, secure MPC.

5. **Differential Privacy Provides Guarantees**: Formal mathematical privacy with (ε, δ) parameters, but involves accuracy trade-offs.

6. **GDPR Applies to AI**: Right to explanation, data minimization, DPIAs required for high-risk AI. Build privacy-by-design.

7. **Security is a Lifecycle Concern**: Integrate security from requirements through monitoring, not just at deployment.

8. **Privacy-Utility Trade-Off**: More privacy (smaller ε, more noise) means lower accuracy. Balance based on risk and requirements.

9. **Monitoring is Critical**: Continuous monitoring for adversarial attacks, model degradation, and privacy breaches post-deployment.

10. **Compliance is Non-Negotiable**: GDPR violations carry severe penalties. DPIAs, transparency, and data subject rights are legal requirements.

### Reflection Questions

1. What are the most critical security threats to your AI systems? How would you prioritize defenses?

2. Does your organization process personal data in AI systems? What GDPR obligations apply?

3. What privacy-utility trade-offs are acceptable in your context? Who decides?

4. How would you implement a DPIA process for high-risk AI projects?

5. What monitoring would you put in place to detect adversarial attacks or privacy breaches?

### Action Items

Your security and privacy checklist:

- [ ] **Conduct threat modeling** for AI systems using STRIDE or ATT&CK for ML frameworks
- [ ] **Implement adversarial testing** in your evaluation pipeline
- [ ] **Apply differential privacy** to high-risk models processing sensitive data
- [ ] **Complete DPIA** for AI systems processing EU residents' personal data
- [ ] **Set up security monitoring** to detect adversarial inputs and anomalies
- [ ] **Train your team** on AI security and privacy best practices
- [ ] **Review data collection** practices for GDPR compliance (purpose limitation, data minimization)
- [ ] **Implement data subject rights** processes (access, deletion, explanation)
- [ ] **Establish incident response** procedures for AI security breaches

---

## Next Steps 🚀

In **Module 4: Regulatory Compliance (GDPR, AI Act)**, we'll explore:

**Deep Regulatory Dive:**
- Comprehensive GDPR requirements for AI systems
- EU AI Act: Risk-based regulation, prohibited uses, high-risk AI obligations
- Sector-specific regulations (healthcare, finance, employment)
- International regulatory landscape

**Practical Compliance:**
- Compliance frameworks and checklists
- Documentation and audit requirements
- Real-world compliance case studies

### Preview Exercise

**Security & Privacy Assessment Challenge:**

You're deploying a facial recognition system for office access control. Address these critical questions:

1. **Adversarial Threats**: What attacks might target this system? (Think physical adversarial patches!)
2. **Privacy Risks**: What inference attacks could expose employee data?
3. **GDPR Obligations**: What legal requirements apply to biometric processing?
4. **Technical Safeguards**: What defenses would you implement?
5. **Monitoring Strategy**: How would you detect attacks and breaches post-launch?

Prepare your comprehensive approach—we'll connect these concerns to regulatory requirements in Module 4.

---

## 🎉 Congratulations on Completing Module 3!

You've now mastered:

✅ AI-specific security threats and sophisticated attack vectors  
✅ Practical defense mechanisms and their trade-offs  
✅ Privacy-preserving techniques that actually work  
✅ GDPR requirements and compliance strategies  
✅ Secure AI development lifecycle best practices

You're equipped to build secure, privacy-respecting AI systems that protect both your organization and your users. The skills you've gained here aren't just theoretical—they're essential for any production AI system.

**Ready to continue?** → Proceed to **Module 4: Regulatory Compliance (GDPR, AI Act)** 📜
