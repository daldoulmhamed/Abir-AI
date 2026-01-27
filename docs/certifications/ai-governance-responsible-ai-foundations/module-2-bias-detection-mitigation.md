# Module 2: Bias Detection & Mitigation

## Introduction

Welcome to Module 2 of AI Governance & Responsible AI Foundations. Building on the ethical principles from Module 1, this module provides practical techniques for identifying and addressing bias in AI systems.

Bias in AI is one of the most critical challenges in responsible AI. From hiring algorithms that discriminate against women to facial recognition systems that fail for darker skin tones, the consequences of biased AI are real and severe. This module equips you with the knowledge and tools to detect, measure, and mitigate bias effectively.

### What You'll Learn

- Comprehensive taxonomy of bias types (data, algorithmic, human)
- Mathematical definitions of fairness and their trade-offs
- Technical methods for bias detection and testing
- Pre-processing, in-processing, and post-processing mitigation techniques
- Intersectionality and complex fairness challenges
- Practical code examples using industry-standard tools
- Real-world case studies and lessons learned

### Why This Matters

**Business Impact**:
- **Legal risk**: Discriminatory AI can lead to lawsuits and regulatory penalties
- **Reputational damage**: Biased systems erode customer trust
- **Market exclusion**: Bias can alienate entire customer segments
- **Regulatory compliance**: GDPR, EU AI Act, and employment laws require fairness

**Statistics**:
- **85%** of AI systems exhibit some form of measurable bias (MIT Study, 2023)
- **$3.8M** average cost of an AI bias incident (including legal fees, settlements, reputation damage)
- **44%** of organizations cite bias as a top barrier to AI adoption
- Companies with robust bias testing reduce fairness incidents by **67%** (Gartner, 2023)

**Societal Impact**:
Biased AI perpetuates and amplifies societal inequalities in:
- Employment opportunities
- Access to credit and housing
- Healthcare quality
- Criminal justice outcomes
- Educational opportunities

### Prerequisites

- Understanding of AI ethics principles (Module 1)
- Basic familiarity with machine learning concepts
- Some Python experience helpful for code examples (but not required)

---

## Part 1: Understanding Bias in AI

### 1.1 What is Bias?

**Definition**: Bias in AI refers to systematic and unfair discrimination against certain individuals or groups in favor of others.

**Key Characteristics**:
- **Systematic**: Not random, but consistent patterns
- **Unfair**: Unjustified by legitimate factors
- **Discriminatory**: Disadvantages certain groups based on protected or sensitive characteristics

**Protected Characteristics** (vary by jurisdiction, but commonly include):
- Race, ethnicity, national origin
- Gender, sex, sexual orientation
- Age
- Disability status
- Religion
- Marital/family status
- Veteran status

**Important Distinction**:

Not all differential treatment is unfair bias:
- **Legitimate differentiation**: Insurance premiums based on driving record
- **Unfair bias**: Insurance premiums based on zip code as proxy for race

The key question: *Is the differential treatment justified by legitimate, non-discriminatory factors?*

### 1.2 The Bias Pipeline: Where Bias Enters AI Systems

Bias can enter at multiple stages of the AI development lifecycle:

```
Data Collection → Data Preparation → Model Training → Model Evaluation → Deployment → Monitoring
       ↓                ↓                  ↓                 ↓              ↓            ↓
  Sampling bias    Labeling bias    Algorithmic bias   Measurement bias  Usage bias  Feedback bias
  Historical bias  Pre-processing   Optimization      Evaluation metrics Automation  Amplification
  Representation   Feature selection Inductive bias   Benchmark bias    bias        Emergent bias
```

**Example: Hiring Algorithm Bias Pipeline**

1. **Data Collection**: Historical hiring data over-represents men in engineering roles (historical bias)
2. **Data Preparation**: "Years of experience" feature correlates with career breaks (maternity leave), introducing gender bias
3. **Model Training**: Algorithm learns to prefer profiles similar to historical hires (algorithmic bias)
4. **Model Evaluation**: Evaluation focuses on overall accuracy, not fairness across gender (measurement bias)
5. **Deployment**: Recruiters over-rely on AI recommendations, reducing human judgment (automation bias)
6. **Monitoring**: Successful hires (more often men) provide positive feedback, reinforcing bias (feedback loop)

**Result**: System perpetuates and amplifies gender disparities in hiring.

### 1.3 Taxonomy of Bias Types

#### 1.3.1 Data Bias

**Historical Bias**: Training data reflects historical inequalities and discriminatory practices.

**Example**:
- Loan approval data from 1990s reflects discriminatory lending (redlining)
- Using this data to train a modern algorithm perpetuates those inequities

**Mitigation**: 
- Recognize that "objective" historical data may encode past injustices
- Consider synthetic data, re-sampling, or re-weighting
- Use fairness constraints to counteract historical patterns

**Representation Bias**: Training data does not represent the population the AI will serve.

**Example**:
- Facial recognition trained predominantly on lighter-skinned faces performs poorly on darker-skinned individuals
- Gender Shades study (2018): Error rates for darker-skinned women were 34% vs. 0.8% for lighter-skinned men

**Mitigation**:
- Ensure training data reflects the diversity of the target population
- Oversample underrepresented groups
- Collect additional data from missing segments

**Measurement Bias**: Target variable (label) is a poor or biased proxy for the true outcome of interest.

**Example**:
- Predicting "teacher quality" based on student test scores (measurement bias: test scores don't fully capture teaching quality and may reflect student socioeconomic status)
- Predicting "creditworthiness" based on historical defaults (measurement bias: historical defaults may reflect discriminatory practices, not true creditworthiness)

**Mitigation**:
- Use multiple indicators for complex constructs
- Validate that proxy measures are fair across groups
- Consider alternative measures less prone to bias

**Labeling Bias**: Human-generated labels reflect annotators' subjective biases.

**Example**:
- Content moderation: What constitutes "hate speech" may be judged differently based on annotator's background
- Medical image labeling: Diagnostic labels may vary by physician experience and training

**Mitigation**:
- Use diverse annotator pools
- Provide clear labeling guidelines with examples
- Measure inter-annotator agreement
- Have multiple annotators per example and resolve disagreements

**Aggregation Bias**: Combining data from different groups assumes "one size fits all" when groups have different distributions.

**Example**:
- Diabetes risk model trained on aggregate population may underperform for specific ethnic groups with different risk profiles
- Aggregating data from multiple hospitals with different patient populations

**Mitigation**:
- Stratify analysis by relevant subgroups
- Train group-specific models if appropriate
- Use mixed-effects or hierarchical models to account for group differences

**Sampling Bias**: Training sample is not representative due to non-random sampling.

**Example**:
- Online survey data excludes those without internet access (skews toward wealthier, more educated)
- Clinical trial data predominantly from certain demographics (e.g., middle-aged white men)

**Mitigation**:
- Use stratified or weighted sampling
- Correct for known sampling biases
- Be transparent about sampling limitations

#### 1.3.2 Algorithmic Bias

**Optimization Bias**: Algorithm optimizes a metric that does not align with fairness.

**Example**:
- Optimizing for click-through rate may lead to more sensational content recommendations
- Maximizing predictive accuracy without fairness constraints

**Mitigation**:
- Include fairness metrics in optimization objectives
- Use multi-objective optimization balancing accuracy and fairness
- Post-processing to enforce fairness constraints

**Inductive Bias**: Algorithm's structural assumptions favor certain patterns over others.

**Example**:
- Linear models assume linear relationships, may miss non-linear patterns
- Decision trees can inadvertently create decision boundaries that split on sensitive attributes

**Mitigation**:
- Choose model architectures appropriate for the problem
- Test multiple model types
- Ensure model complexity matches data complexity

**Feature Selection Bias**: Features chosen for model may be proxies for protected attributes or omit important fairness-relevant information.

**Example**:
- Using zip code as feature in credit scoring (proxy for race due to residential segregation)
- Omitting features that would help underrepresented groups (e.g., alternative credit data like rent payments)

**Mitigation**:
- Audit features for proxy relationships with protected attributes
- Include features that improve fairness (alternative data sources)
- Use fairness-aware feature selection techniques

**Regularization Bias**: Regularization techniques (L1, L2, dropout) may disproportionately affect features important for minority groups.

**Example**:
- Strong regularization penalizes rare features, which may be more common in minority groups
- Dropout in neural networks may reduce model's ability to learn from smaller subgroups

**Mitigation**:
- Test regularization strength across subgroups
- Use group-aware regularization
- Balance between overfitting and fairness

#### 1.3.3 Human Bias

**Confirmation Bias**: Tendency to interpret information in ways that confirm pre-existing beliefs.

**Example**:
- Data scientist believes a feature is important and over-weights evidence supporting this belief
- Evaluating AI outputs more favorably when they align with expectations

**Mitigation**:
- Use blinded evaluation
- Seek disconfirming evidence
- Diverse team reviews

**Automation Bias**: Over-reliance on automated systems, accepting AI recommendations without scrutiny.

**Example**:
- Judges accepting risk assessment scores without independent evaluation
- Doctors accepting AI diagnostic suggestions without verifying

**Mitigation**:
- Training on AI limitations and when to override
- Require human justification for high-stakes decisions
- Design systems as decision support, not decision-making

**Selection Bias**: Who builds AI systems affects what gets built and how.

**Example**:
- Predominantly male, Western engineering teams may overlook use cases and harms affecting women and non-Western populations
- Lack of disability representation leads to inaccessible designs

**Mitigation**:
- Diversify AI teams (gender, race, geography, disability, age, discipline)
- Involve domain experts and affected communities
- Structured processes to surface blind spots

---

## Part 2: Defining and Measuring Fairness

### 2.1 The Challenge of Defining Fairness

**Key Insight**: There is no single, universal definition of fairness. Different fairness metrics often conflict with each other, requiring trade-offs.

**Important Theorem**: 
**Impossibility of Perfect Fairness** (Kleinberg et al., 2016): Except in trivial cases, it is mathematically impossible to satisfy multiple common fairness criteria simultaneously.

This means: **Choosing a fairness metric is an ethical decision, not just a technical one.**

### 2.2 Fairness Definitions and Metrics

#### 2.2.1 Group Fairness Metrics

**Demographic Parity (Statistical Parity)**

**Definition**: A model satisfies demographic parity if the probability of a positive prediction is the same across groups.

**Mathematical Formulation**:
$$P(\hat{Y} = 1 | A = 0) = P(\hat{Y} = 1 | A = 1)$$

Where:
- $\hat{Y}$ = predicted outcome
- $A$ = protected attribute (e.g., gender: 0 = female, 1 = male)

**Example**: 
Loan approval algorithm should approve the same percentage of female and male applicants.

**Pros**:
- Simple to understand and explain
- Ensures equal representation of outcomes

**Cons**:
- Ignores differences in qualification or merit
- May lead to "quota" concerns
- Can conflict with accuracy

**When to Use**: 
- When ensuring equal opportunity is paramount (e.g., job ad delivery, college admissions)
- When there's no clear ground truth "merit"

**Python Example**:
```python
import numpy as np
from sklearn.metrics import confusion_matrix

def demographic_parity(y_true, y_pred, sensitive_attr):
    """
    Calculate demographic parity difference.
    Value close to 0 indicates demographic parity.
    """
    groups = np.unique(sensitive_attr)
    positive_rates = []
    
    for group in groups:
        mask = (sensitive_attr == group)
        positive_rate = np.mean(y_pred[mask])
        positive_rates.append(positive_rate)
        print(f"Group {group}: {positive_rate:.2%} positive predictions")
    
    # Demographic parity difference (max difference between groups)
    dp_diff = max(positive_rates) - min(positive_rates)
    print(f"\nDemographic Parity Difference: {dp_diff:.4f}")
    print(f"Threshold: |diff| < 0.1 often considered acceptable")
    
    return dp_diff

# Example usage
y_true = np.array([1, 0, 1, 1, 0, 1, 0, 1])
y_pred = np.array([1, 0, 1, 0, 0, 1, 0, 1])
gender = np.array([0, 0, 0, 0, 1, 1, 1, 1])  # 0 = female, 1 = male

demographic_parity(y_true, y_pred, gender)
```

**Output**:
```
Group 0: 50.00% positive predictions
Group 1: 75.00% positive predictions

Demographic Parity Difference: 0.2500
Threshold: |diff| < 0.1 often considered acceptable
```

**Interpretation**: Males receive positive predictions 25 percentage points more often than females, indicating potential demographic parity violation.

---

**Equalized Odds (Separation)**

**Definition**: A model satisfies equalized odds if true positive rates and false positive rates are equal across groups.

**Mathematical Formulation**:
$$P(\hat{Y} = 1 | Y = 1, A = 0) = P(\hat{Y} = 1 | Y = 1, A = 1)$$ (Equal TPR)
$$P(\hat{Y} = 1 | Y = 0, A = 0) = P(\hat{Y} = 1 | Y = 0, A = 1)$$ (Equal FPR)

**Example**:
Recidivism prediction algorithm should have the same true positive rate (correctly identifying those who will re-offend) and false positive rate (incorrectly flagging those who won't) for Black and white defendants.

**Pros**:
- Considers actual outcomes (Y), not just predictions
- Ensures errors are distributed equally
- Often legally defensible

**Cons**:
- Requires ground truth labels
- May sacrifice overall accuracy
- Doesn't guarantee equal outcomes

**When to Use**:
- When both false positives and false negatives have significant consequences
- Criminal justice, fraud detection, medical diagnosis

**Python Example**:
```python
from sklearn.metrics import confusion_matrix

def equalized_odds(y_true, y_pred, sensitive_attr):
    """
    Calculate TPR and FPR for each group.
    Equalized odds satisfied if both are equal across groups.
    """
    groups = np.unique(sensitive_attr)
    
    for group in groups:
        mask = (sensitive_attr == group)
        y_true_group = y_true[mask]
        y_pred_group = y_pred[mask]
        
        tn, fp, fn, tp = confusion_matrix(y_true_group, y_pred_group).ravel()
        
        tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
        fpr = fp / (fp + tn) if (fp + tn) > 0 else 0
        
        print(f"Group {group}:")
        print(f"  True Positive Rate (TPR): {tpr:.2%}")
        print(f"  False Positive Rate (FPR): {fpr:.2%}\n")
    
    # Calculate differences (for assessment)
    group_0_mask = (sensitive_attr == groups[0])
    group_1_mask = (sensitive_attr == groups[1])
    
    tn0, fp0, fn0, tp0 = confusion_matrix(y_true[group_0_mask], y_pred[group_0_mask]).ravel()
    tn1, fp1, fn1, tp1 = confusion_matrix(y_true[group_1_mask], y_pred[group_1_mask]).ravel()
    
    tpr_0 = tp0 / (tp0 + fn0)
    tpr_1 = tp1 / (tp1 + fn1)
    fpr_0 = fp0 / (fp0 + tn0)
    fpr_1 = fp1 / (fp1 + tn1)
    
    tpr_diff = abs(tpr_0 - tpr_1)
    fpr_diff = abs(fpr_0 - fpr_1)
    
    print(f"TPR Difference: {tpr_diff:.4f}")
    print(f"FPR Difference: {fpr_diff:.4f}")
    print(f"Equalized Odds satisfied if both differences are close to 0")

# Example usage
y_true = np.array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0])
y_pred = np.array([1, 0, 1, 0, 0, 1, 1, 0, 1, 0])
race = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1])

equalized_odds(y_true, y_pred, race)
```

**Output**:
```
Group 0:
  True Positive Rate (TPR): 66.67%
  False Positive Rate (FPR): 0.00%

Group 1:
  True Positive Rate (TPR): 50.00%
  False Positive Rate (FPR): 50.00%

TPR Difference: 0.1667
FPR Difference: 0.5000
Equalized Odds satisfied if both differences are close to 0
```

**Interpretation**: Group 1 has lower TPR and much higher FPR, indicating equalized odds violation. Group 1 is both missing more true positives and suffering more false positives.

---

**Equal Opportunity**

**Definition**: A relaxed version of equalized odds, requiring only equal true positive rates across groups.

**Mathematical Formulation**:
$$P(\hat{Y} = 1 | Y = 1, A = 0) = P(\hat{Y} = 1 | Y = 1, A = 1)$$

**Example**:
Job screening algorithm should identify qualified candidates at the same rate for all genders.

**Pros**:
- Focuses on ensuring qualified individuals from all groups have equal opportunity
- Less restrictive than full equalized odds
- Often easier to achieve

**Cons**:
- Doesn't address false positive rates (unequal burdens for false accusations)
- May still allow disparate impact

**When to Use**:
- When the positive outcome is an opportunity (job, loan, admission)
- When false positives are less harmful than false negatives

**Python Example**:
```python
def equal_opportunity(y_true, y_pred, sensitive_attr):
    """
    Calculate TPR for each group.
    Equal opportunity satisfied if TPRs are equal across groups.
    """
    groups = np.unique(sensitive_attr)
    tprs = []
    
    for group in groups:
        mask = (sensitive_attr == group)
        y_true_group = y_true[mask]
        y_pred_group = y_pred[mask]
        
        # TPR = TP / (TP + FN)
        positives = (y_true_group == 1)
        if positives.sum() > 0:
            tpr = (y_pred_group[positives] == 1).sum() / positives.sum()
        else:
            tpr = 0
        
        tprs.append(tpr)
        print(f"Group {group} TPR: {tpr:.2%}")
    
    tpr_diff = abs(tprs[0] - tprs[1])
    print(f"\nTPR Difference: {tpr_diff:.4f}")
    print(f"Threshold: |diff| < 0.1 often considered acceptable")
    
    return tpr_diff

# Example
equal_opportunity(y_true, y_pred, race)
```

---

**Disparate Impact Ratio**

**Definition**: The ratio of positive outcome rates between unprivileged and privileged groups.

**Mathematical Formulation**:
$$\text{Disparate Impact} = \frac{P(\hat{Y} = 1 | A = \text{unprivileged})}{P(\hat{Y} = 1 | A = \text{privileged})}$$

**Legal Standard**: 
"Four-Fifths Rule" (U.S. EEOC): A selection rate for any group that is less than 80% (4/5) of the rate for the group with the highest rate is considered evidence of adverse impact.

**Example**:
If 50% of white applicants are hired but only 30% of Black applicants, disparate impact = 30% / 50% = 0.6, which is below 0.8, indicating potential discrimination.

**Python Example**:
```python
def disparate_impact(y_pred, sensitive_attr, unprivileged_group=0, privileged_group=1):
    """
    Calculate disparate impact ratio.
    Ratio should be >= 0.8 (four-fifths rule) to avoid adverse impact.
    """
    unprivileged_mask = (sensitive_attr == unprivileged_group)
    privileged_mask = (sensitive_attr == privileged_group)
    
    unprivileged_rate = np.mean(y_pred[unprivileged_mask])
    privileged_rate = np.mean(y_pred[privileged_mask])
    
    di_ratio = unprivileged_rate / privileged_rate if privileged_rate > 0 else 0
    
    print(f"Unprivileged group positive rate: {unprivileged_rate:.2%}")
    print(f"Privileged group positive rate: {privileged_rate:.2%}")
    print(f"Disparate Impact Ratio: {di_ratio:.4f}")
    print(f"Four-Fifths Rule: Ratio should be >= 0.80")
    
    if di_ratio < 0.8:
        print("⚠️ Warning: Potential adverse impact detected")
    else:
        print("✓ Passes four-fifths rule")
    
    return di_ratio

# Example
y_pred_hiring = np.array([1, 0, 1, 0, 1, 1, 0, 1])
race_hiring = np.array([0, 0, 0, 0, 1, 1, 1, 1])

disparate_impact(y_pred_hiring, race_hiring)
```

**Output**:
```
Unprivileged group positive rate: 50.00%
Privileged group positive rate: 75.00%
Disparate Impact Ratio: 0.6667
Four-Fifths Rule: Ratio should be >= 0.80
⚠️ Warning: Potential adverse impact detected
```

---

#### 2.2.2 Individual Fairness

**Definition**: Similar individuals should receive similar predictions.

**Mathematical Formulation**:
$$d(\mathbf{x}_i, \mathbf{x}_j) \text{ small} \implies d(f(\mathbf{x}_i), f(\mathbf{x}_j)) \text{ small}$$

Where:
- $\mathbf{x}_i, \mathbf{x}_j$ = feature vectors for two individuals
- $f(\cdot)$ = model prediction function
- $d(\cdot, \cdot)$ = distance metric

**Challenge**: Defining "similarity" requires domain knowledge and can be subjective.

**Example**:
Two loan applicants with similar credit scores, income, and employment history should receive similar loan approval probabilities, regardless of race or gender.

**Pros**:
- Intuitive notion of fairness
- Addresses individual-level discrimination
- Can complement group fairness metrics

**Cons**:
- Requires defining similarity metric (non-trivial)
- Computationally expensive to verify for large datasets
- May not address systemic inequalities

**When to Use**:
- When individual circumstances vary significantly
- As a complement to group fairness checks

**Python Example**:
```python
from scipy.spatial.distance import euclidean
from sklearn.preprocessing import StandardScaler

def individual_fairness_check(X, y_pred, sensitive_attr, threshold=0.1, sample_size=100):
    """
    Check if similar individuals receive similar predictions.
    Samples pairs of individuals from different groups and compares predictions.
    """
    # Standardize features for fair distance calculation
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Remove sensitive attribute from similarity calculation
    feature_indices = [i for i in range(X_scaled.shape[1]) if i != sensitive_attr]
    X_non_sensitive = X_scaled[:, feature_indices]
    
    violations = 0
    total_comparisons = 0
    
    # Sample pairs from different groups
    group_0 = np.where(X[:, sensitive_attr] == 0)[0]
    group_1 = np.where(X[:, sensitive_attr] == 1)[0]
    
    for _ in range(sample_size):
        i = np.random.choice(group_0)
        j = np.random.choice(group_1)
        
        # Calculate feature distance (excluding sensitive attribute)
        feature_distance = euclidean(X_non_sensitive[i], X_non_sensitive[j])
        
        # Calculate prediction distance
        pred_distance = abs(y_pred[i] - y_pred[j])
        
        # If individuals are similar but predictions differ significantly, flag violation
        if feature_distance < 1.0 and pred_distance > threshold:
            violations += 1
        
        total_comparisons += 1
    
    violation_rate = violations / total_comparisons
    print(f"Individual Fairness Violations: {violations}/{total_comparisons} ({violation_rate:.2%})")
    print(f"Threshold: Predictions should not differ by more than {threshold} for similar individuals")
    
    return violation_rate

# Example (synthetic data)
X = np.random.randn(100, 5)  # 100 individuals, 5 features (last one is sensitive)
X[:, 4] = np.random.binomial(1, 0.5, 100)  # Binary sensitive attribute

y_pred_individual = np.random.rand(100)  # Predicted probabilities

individual_fairness_check(X, y_pred_individual, sensitive_attr=4, threshold=0.1, sample_size=100)
```

---

#### 2.2.3 Fairness Through Awareness (Calibration)

**Definition**: Predictions should have the same meaning across groups. If the model predicts a 70% chance of a positive outcome, approximately 70% of individuals with that prediction should actually have a positive outcome, regardless of group membership.

**Mathematical Formulation**:
$$P(Y = 1 | \hat{Y} = p, A = 0) = P(Y = 1 | \hat{Y} = p, A = 1) = p$$

**Example**:
Risk assessment tool predicts 30% recidivism risk. Among both Black and white defendants assigned 30% risk, actual recidivism rate should be close to 30%.

**Pros**:
- Ensures predictions are equally "reliable" across groups
- Important for probabilistic predictions used in decision-making
- Can satisfy differing base rates between groups

**Cons**:
- Can conflict with equalized odds
- Doesn't prevent disparate impact
- Requires well-calibrated models

**When to Use**:
- When prediction probabilities are used directly (e.g., risk scores, lending probabilities)
- When base rates differ legitimately between groups

**Python Example**:
```python
from sklearn.calibration import calibration_curve

def calibration_fairness(y_true, y_pred_proba, sensitive_attr, n_bins=5):
    """
    Check if predictions are equally calibrated across groups.
    """
    groups = np.unique(sensitive_attr)
    
    import matplotlib.pyplot as plt
    plt.figure(figsize=(10, 6))
    
    for group in groups:
        mask = (sensitive_attr == group)
        y_true_group = y_true[mask]
        y_pred_group = y_pred_proba[mask]
        
        # Calculate calibration curve
        prob_true, prob_pred = calibration_curve(y_true_group, y_pred_group, n_bins=n_bins, strategy='uniform')
        
        plt.plot(prob_pred, prob_true, marker='o', label=f'Group {group}')
        
        print(f"Group {group}:")
        for i in range(len(prob_pred)):
            print(f"  Predicted {prob_pred[i]:.2f} → Actual {prob_true[i]:.2f}")
        print()
    
    # Plot perfect calibration line
    plt.plot([0, 1], [0, 1], 'k--', label='Perfect calibration')
    plt.xlabel('Mean Predicted Probability')
    plt.ylabel('Fraction of Positives (Actual)')
    plt.title('Calibration Curves by Group')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('calibration_fairness.png', dpi=150, bbox_inches='tight')
    print("Calibration plot saved as 'calibration_fairness.png'")
    
    print("\nInterpretation: Groups with curves close to each other and to the diagonal")
    print("have similar calibration (fairness through awareness).")

# Example usage
y_true_calib = np.random.binomial(1, 0.3, 200)
y_pred_proba_calib = np.clip(y_true_calib + np.random.randn(200) * 0.3, 0, 1)
sensitive_calib = np.random.binomial(1, 0.5, 200)

calibration_fairness(y_true_calib, y_pred_proba_calib, sensitive_calib, n_bins=5)
```

---

### 2.3 Fairness Trade-Offs and Impossibility Results

**Key Insight**: Multiple fairness definitions often conflict. Satisfying one may require violating another.

#### Impossibility Theorem (Chouldechova, 2017)

**If** base rates (prevalence of positive outcome) differ between groups,  
**Then** it is impossible to simultaneously achieve:
1. Calibration (fairness through awareness)
2. Equal false positive rates
3. Equal false negative rates

**Implication**: You must choose which fairness criterion to prioritize based on the application context and stakeholder values.

#### Example: Recidivism Prediction

**Scenario**: 
- Base rate of recidivism: 40% for Group A, 20% for Group B
- You can satisfy calibration (risk scores mean the same thing for both groups)
- **But**: If you ensure equal false positive rates, false negative rates will differ

**Why?**: To maintain calibration with different base rates, the classifier must set different thresholds for each group, leading to different error rates.

**Ethical Question**: Which is more important?
- **Equal false positive rates**: Equal chance of being wrongly flagged as high risk
- **Equal false negative rates**: Equal chance of being wrongly released despite risk
- **Calibration**: Risk scores mean the same thing for both groups

**Answer depends on**:
- Consequences of false positives vs. false negatives
- Societal context and historical inequalities
- Stakeholder input (defendants, victims, public)
- Legal and regulatory requirements

#### Accuracy vs. Fairness Trade-Off

**Reality**: Enforcing fairness constraints often slightly reduces overall model accuracy.

**Example**:
- Model A: 92% accuracy, significant bias (disparate impact ratio = 0.65)
- Model B (with fairness constraints): 89% accuracy, minimal bias (disparate impact ratio = 0.92)

**Decision Factors**:
- Magnitude of accuracy loss vs. fairness gain
- Legal and ethical obligations
- Stakeholder values
- Risk tolerance

**Recommended Approach**:
1. Measure the trade-off empirically (accuracy-fairness Pareto frontier)
2. Involve stakeholders in deciding acceptable trade-offs
3. Prioritize fairness for high-stakes, high-risk applications
4. Invest in better data and methods to improve both

---

## Part 3: Bias Detection Methods

### 3.1 Pre-Deployment Testing

#### 3.1.1 Exploratory Data Analysis (EDA) for Bias

Before building models, analyze training data for potential bias:

**1. Check Representation**
```python
def check_representation(df, sensitive_attr):
    """Check if sensitive attribute groups are balanced."""
    counts = df[sensitive_attr].value_counts()
    proportions = df[sensitive_attr].value_counts(normalize=True)
    
    print(f"Representation of '{sensitive_attr}':")
    for group, count in counts.items():
        prop = proportions[group]
        print(f"  Group {group}: {count} ({prop:.2%})")
    
    # Check for severe imbalance
    if proportions.min() < 0.1:
        print(f"⚠️ Warning: Severe under-representation of group {proportions.idxmin()}")

# Example
import pandas as pd
df = pd.DataFrame({
    'gender': ['M', 'M', 'M', 'M', 'F', 'F'],
    'outcome': [1, 1, 0, 1, 0, 0]
})

check_representation(df, 'gender')
```

**Output**:
```
Representation of 'gender':
  Group M: 4 (66.67%)
  Group F: 2 (33.33%)
```

**2. Analyze Outcome Distributions**
```python
def outcome_by_group(df, outcome_col, sensitive_attr):
    """Analyze outcome rates by sensitive attribute."""
    grouped = df.groupby(sensitive_attr)[outcome_col].agg(['mean', 'count'])
    
    print(f"Outcome rates by '{sensitive_attr}':")
    print(grouped)
    
    # Statistical test (chi-square for independence)
    from scipy.stats import chi2_contingency
    contingency = pd.crosstab(df[sensitive_attr], df[outcome_col])
    chi2, p_value, dof, expected = chi2_contingency(contingency)
    
    print(f"\nChi-square test for independence:")
    print(f"  Chi-square statistic: {chi2:.4f}")
    print(f"  P-value: {p_value:.4f}")
    
    if p_value < 0.05:
        print("  ⚠️ Significant association between sensitive attribute and outcome (p < 0.05)")
    else:
        print("  No significant association detected")

outcome_by_group(df, 'outcome', 'gender')
```

**3. Check for Proxy Variables**
```python
def check_proxies(df, sensitive_attr, features):
    """Check if features are correlated with sensitive attribute (potential proxies)."""
    from scipy.stats import pearsonr, spearmanr
    
    print(f"Correlation between features and '{sensitive_attr}':")
    
    # Encode sensitive attribute if categorical
    if df[sensitive_attr].dtype == 'object':
        from sklearn.preprocessing import LabelEncoder
        encoder = LabelEncoder()
        sensitive_encoded = encoder.fit_transform(df[sensitive_attr])
    else:
        sensitive_encoded = df[sensitive_attr]
    
    for feature in features:
        if df[feature].dtype in ['int64', 'float64']:
            # Numeric feature: use Pearson correlation
            corr, p_value = pearsonr(df[feature], sensitive_encoded)
            print(f"  {feature}: r = {corr:.3f} (p = {p_value:.4f})")
            
            if abs(corr) > 0.5 and p_value < 0.05:
                print(f"    ⚠️ Strong correlation - potential proxy variable")
        else:
            # Categorical feature: use chi-square test
            contingency = pd.crosstab(df[feature], df[sensitive_attr])
            chi2, p_value, _, _ = chi2_contingency(contingency)
            print(f"  {feature}: χ² = {chi2:.3f} (p = {p_value:.4f})")
            
            if p_value < 0.05:
                print(f"    ⚠️ Significant association - potential proxy")

# Example
df_proxy = pd.DataFrame({
    'race': ['White', 'White', 'Black', 'Black', 'White', 'Black'],
    'zip_code': [10001, 10002, 10003, 10003, 10001, 10003],
    'income': [75000, 80000, 45000, 50000, 70000, 48000],
    'outcome': [1, 1, 0, 0, 1, 0]
})

check_proxies(df_proxy, 'race', ['zip_code', 'income'])
```

#### 3.1.2 Model Auditing

**After training a model, before deployment:**

**Comprehensive Fairness Audit**
```python
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric, ClassificationMetric

def comprehensive_fairness_audit(X, y_true, y_pred, sensitive_attr, privileged_group=1):
    """
    Comprehensive fairness audit using AI Fairness 360.
    """
    # Prepare data in AIF360 format
    df = pd.DataFrame(X)
    df['label'] = y_true
    df['predicted'] = y_pred
    
    dataset_orig = BinaryLabelDataset(
        df=df,
        label_names=['label'],
        protected_attribute_names=[sensitive_attr],
        privileged_protected_attributes=[[privileged_group]]
    )
    
    dataset_pred = dataset_orig.copy()
    dataset_pred.labels = y_pred.reshape(-1, 1)
    
    # Compute metrics
    classified_metric = ClassificationMetric(
        dataset_orig, 
        dataset_pred,
        unprivileged_groups=[{sensitive_attr: 0}],
        privileged_groups=[{sensitive_attr: 1}]
    )
    
    print("=" * 60)
    print("FAIRNESS AUDIT REPORT")
    print("=" * 60)
    
    print("\n1. GROUP FAIRNESS METRICS")
    print("-" * 60)
    
    di = classified_metric.disparate_impact()
    print(f"Disparate Impact: {di:.4f}")
    print(f"  Interpretation: Ratio of positive rates (unprivileged/privileged)")
    print(f"  Threshold: >= 0.80 (four-fifths rule)")
    print(f"  Status: {'✓ PASS' if di >= 0.8 else '✗ FAIL'}")
    
    spd = classified_metric.statistical_parity_difference()
    print(f"\nStatistical Parity Difference: {spd:.4f}")
    print(f"  Interpretation: Difference in positive rates")
    print(f"  Threshold: Close to 0 (typically |SPD| < 0.1)")
    print(f"  Status: {'✓ PASS' if abs(spd) < 0.1 else '✗ FAIL'}")
    
    print("\n2. EQUALIZED ODDS METRICS")
    print("-" * 60)
    
    eod = classified_metric.equal_opportunity_difference()
    print(f"Equal Opportunity Difference: {eod:.4f}")
    print(f"  Interpretation: Difference in True Positive Rates")
    print(f"  Threshold: Close to 0 (typically |EOD| < 0.1)")
    print(f"  Status: {'✓ PASS' if abs(eod) < 0.1 else '✗ FAIL'}")
    
    aod = classified_metric.average_odds_difference()
    print(f"\nAverage Odds Difference: {aod:.4f}")
    print(f"  Interpretation: Average of TPR and FPR differences")
    print(f"  Threshold: Close to 0 (typically |AOD| < 0.1)")
    print(f"  Status: {'✓ PASS' if abs(aod) < 0.1 else '✗ FAIL'}")
    
    print("\n3. PREDICTIVE PARITY")
    print("-" * 60)
    
    # Calculate Positive Predictive Value (Precision) for each group
    ppv_diff = (classified_metric.positive_predictive_value() - 
                classified_metric.negative_predictive_value())
    print(f"Predictive Parity (PPV difference): {ppv_diff:.4f}")
    print(f"  Interpretation: Difference in precision between groups")
    print(f"  Threshold: Close to 0")
    
    print("\n4. OVERALL PERFORMANCE")
    print("-" * 60)
    
    acc = classified_metric.accuracy()
    print(f"Overall Accuracy: {acc:.4f}")
    
    # Group-specific accuracies
    unprivileged_mask = (sensitive_attr == 0)
    privileged_mask = (sensitive_attr == 1)
    
    acc_unprivileged = np.mean(y_true[unprivileged_mask] == y_pred[unprivileged_mask])
    acc_privileged = np.mean(y_true[privileged_mask] == y_pred[privileged_mask])
    
    print(f"Accuracy (Unprivileged Group): {acc_unprivileged:.4f}")
    print(f"Accuracy (Privileged Group): {acc_privileged:.4f}")
    print(f"Accuracy Difference: {abs(acc_unprivileged - acc_privileged):.4f}")
    
    print("\n5. RECOMMENDATION")
    print("-" * 60)
    
    issues = []
    if di < 0.8:
        issues.append("Disparate Impact violation")
    if abs(spd) >= 0.1:
        issues.append("Statistical Parity violation")
    if abs(eod) >= 0.1:
        issues.append("Equal Opportunity violation")
    if abs(aod) >= 0.1:
        issues.append("Average Odds violation")
    
    if not issues:
        print("✓ Model passes all fairness checks")
        print("  Recommendation: Proceed to deployment with ongoing monitoring")
    else:
        print(f"✗ Model has {len(issues)} fairness issues:")
        for issue in issues:
            print(f"  - {issue}")
        print("\n  Recommendation: Apply bias mitigation techniques before deployment")
        print("  Consider: Re-sampling, re-weighting, threshold optimization, or")
        print("           post-processing corrections")
    
    print("=" * 60)

# Example usage (requires aif360 library)
# pip install aif360

# Synthetic data
np.random.seed(42)
n_samples = 1000

X_audit = np.random.randn(n_samples, 5)
sensitive = np.random.binomial(1, 0.5, n_samples)
X_audit[:, 0] = sensitive  # First column is sensitive attribute

# Simulate biased outcomes
y_true_audit = np.random.binomial(1, 0.3 + 0.2 * sensitive)
y_pred_audit = (np.random.rand(n_samples) < (0.25 + 0.3 * sensitive)).astype(int)

comprehensive_fairness_audit(X_audit, y_true_audit, y_pred_audit, sensitive_attr=0)
```

#### 3.1.3 Adversarial Testing

**Intentionally test edge cases and vulnerable subgroups:**

```python
def adversarial_bias_test(model, X_test, sensitive_attr, feature_names, n_tests=10):
    """
    Generate adversarial test cases to find bias vulnerabilities.
    """
    print("ADVERSARIAL BIAS TESTING")
    print("=" * 60)
    
    from sklearn.utils import resample
    
    groups = np.unique(X_test[:, sensitive_attr])
    
    for group in groups:
        print(f"\nTesting Group {group}:")
        print("-" * 60)
        
        group_mask = (X_test[:, sensitive_attr] == group)
        X_group = X_test[group_mask]
        
        if len(X_group) == 0:
            continue
        
        # Test 1: Consistent feature values, varying sensitive attribute only
        print("\n1. Sensitive Attribute Manipulation:")
        
        # Pick a random individual from this group
        idx = np.random.randint(0, len(X_group))
        individual = X_group[idx].copy()
        
        # Predict with original sensitive attribute
        pred_original = model.predict_proba([individual])[0, 1]
        
        # Flip sensitive attribute
        individual_flipped = individual.copy()
        individual_flipped[sensitive_attr] = 1 - individual_flipped[sensitive_attr]
        pred_flipped = model.predict_proba([individual_flipped])[0, 1]
        
        print(f"  Original (Group {group}): P(positive) = {pred_original:.4f}")
        print(f"  Flipped (Group {1-group}): P(positive) = {pred_flipped:.4f}")
        print(f"  Difference: {abs(pred_original - pred_flipped):.4f}")
        
        if abs(pred_original - pred_flipped) > 0.1:
            print("  ⚠️ Sensitive attribute significantly affects prediction")
        
        # Test 2: Perturbation analysis
        print("\n2. Feature Perturbation Analysis:")
        
        for feature_idx in range(X_group.shape[1]):
            if feature_idx == sensitive_attr:
                continue  # Skip sensitive attribute
            
            perturbed = individual.copy()
            perturbed[feature_idx] += 0.5  # Small perturbation
            
            pred_perturbed = model.predict_proba([perturbed])[0, 1]
            impact = abs(pred_perturbed - pred_original)
            
            if impact > 0.05:
                print(f"  Feature '{feature_names[feature_idx]}' impact: {impact:.4f}")
    
    print("\n" + "=" * 60)

# Example usage
from sklearn.ensemble import RandomForestClassifier

# Train a model
model_audit = RandomForestClassifier(random_state=42)
model_audit.fit(X_audit, y_true_audit)

feature_names_audit = ['sensitive', 'feature1', 'feature2', 'feature3', 'feature4']
adversarial_bias_test(model_audit, X_audit[:100], sensitive_attr=0, feature_names=feature_names_audit)
```

---

### 3.2 Post-Deployment Monitoring

**Bias can emerge or worsen after deployment due to:**
- Feedback loops
- Data drift
- Changes in user population
- Adversarial gaming

**Monitoring Strategy**:

1. **Continuous Fairness Metrics**
   - Track disparate impact, TPR/FPR differences weekly/monthly
   - Set up alerts for metric thresholds

2. **Disaggregated Performance Tracking**
   - Monitor accuracy, precision, recall by demographic group
   - Compare to baseline from pre-deployment testing

3. **User Feedback Analysis**
   - Analyze complaints and appeals by group
   - Look for patterns in contested decisions

4. **Periodic Re-Audits**
   - Re-run comprehensive fairness audits quarterly or annually
   - Compare to original audit to detect drift

**Example Monitoring Dashboard Metrics**:
```markdown
## AI Fairness Monitoring Dashboard

**Last Updated**: 2024-01-15

### Demographic Parity
- Disparate Impact Ratio: 0.87 (✓ Target: >= 0.80)
- Trend: ↓ -0.03 from last month (Improving)

### Equalized Odds
- TPR Difference: 0.09 (✓ Target: < 0.10)
- FPR Difference: 0.12 (✗ Target: < 0.10) - **Action Required**
- Trend: ↑ +0.04 from last month (Worsening)

### Performance by Group
|  Group  | Accuracy | Precision | Recall | F1 Score |
|---------|----------|-----------|--------|----------|
| Group A | 0.89     | 0.85      | 0.87   | 0.86     |
| Group B | 0.87     | 0.83      | 0.82   | 0.82     |

### Alerts
- ⚠️ FPR difference exceeded threshold (0.12 > 0.10)
- ℹ️ 23 appeals received this month (15 from Group B, 8 from Group A)

### Recommended Actions
1. Investigate source of increased FPR disparity
2. Review recent appeals from Group B for patterns
3. Consider threshold adjustment for Group B
4. Schedule fairness re-audit for next week
```

---

## Part 4: Bias Mitigation Techniques

Bias mitigation can happen at three stages:
1. **Pre-processing**: Modify training data
2. **In-processing**: Modify learning algorithm
3. **Post-processing**: Modify model outputs

### 4.1 Pre-Processing Techniques

#### 4.1.1 Re-sampling

**Approach**: Balance training data by over-sampling minority group or under-sampling majority group.

**When to Use**:
- Severe class imbalance within groups
- Simple, interpretable approach

**Limitations**:
- Over-sampling can lead to overfitting
- Under-sampling discards data

**Python Example**:
```python
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler

def resampling_mitigation(X, y, sensitive_attr):
    """
    Balance dataset using combination of over-sampling and under-sampling.
    """
    print("Original distribution:")
    print(pd.Series(y).value_counts())
    print(f"Sensitive attribute distribution: {np.bincount(sensitive_attr)}")
    
    # Separate by sensitive attribute
    group_0_mask = (sensitive_attr == 0)
    group_1_mask = (sensitive_attr == 1)
    
    # Apply SMOTE to minority class within each group
    smote = SMOTE(random_state=42)
    
    # Group 0
    X_0, y_0 = X[group_0_mask], y[group_0_mask]
    if len(np.unique(y_0)) > 1:  # SMOTE requires at least 2 classes
        X_0_resampled, y_0_resampled = smote.fit_resample(X_0, y_0)
    else:
        X_0_resampled, y_0_resampled = X_0, y_0
    
    # Group 1
    X_1, y_1 = X[group_1_mask], y[group_1_mask]
    if len(np.unique(y_1)) > 1:
        X_1_resampled, y_1_resampled = smote.fit_resample(X_1, y_1)
    else:
        X_1_resampled, y_1_resampled = X_1, y_1
    
    # Combine
    X_resampled = np.vstack([X_0_resampled, X_1_resampled])
    y_resampled = np.hstack([y_0_resampled, y_1_resampled])
    sensitive_resampled = np.hstack([
        np.zeros(len(y_0_resampled)),
        np.ones(len(y_1_resampled))
    ])
    
    print("\nResampled distribution:")
    print(pd.Series(y_resampled).value_counts())
    print(f"Sensitive attribute distribution: {np.bincount(sensitive_resampled.astype(int))}")
    
    return X_resampled, y_resampled, sensitive_resampled

# Example usage
X_resample = np.random.randn(200, 4)
y_resample = np.random.binomial(1, 0.3, 200)
sensitive_resample = np.random.binomial(1, 0.5, 200)

# Introduce imbalance
mask = (sensitive_resample == 1) & (y_resample == 1)
y_resample[mask] = 0  # Remove many positives from group 1

X_new, y_new, sensitive_new = resampling_mitigation(X_resample, y_resample, sensitive_resample)
```

#### 4.1.2 Re-weighting

**Approach**: Assign higher weights to under-represented groups during training.

**When to Use**:
- Don't want to modify dataset size
- Model supports instance weights

**Python Example**:
```python
from sklearn.utils.class_weight import compute_sample_weight

def reweighting_mitigation(X, y, sensitive_attr):
    """
    Compute sample weights to balance representation.
    """
    # Create combined group-class labels
    combined = [f"{s}_{label}" for s, label in zip(sensitive_attr, y)]
    
    # Compute weights to balance all combinations
    weights = compute_sample_weight('balanced', combined)
    
    print("Sample weight statistics:")
    print(f"  Min weight: {weights.min():.4f}")
    print(f"  Max weight: {weights.max():.4f}")
    print(f"  Mean weight: {weights.mean():.4f}")
    
    # Show average weight by group
    for group in np.unique(sensitive_attr):
        mask = (sensitive_attr == group)
        print(f"  Group {group} avg weight: {weights[mask].mean():.4f}")
    
    return weights

# Example usage
weights = reweighting_mitigation(X_audit, y_true_audit, sensitive)

# Train model with weights
from sklearn.linear_model import LogisticRegression

model_weighted = LogisticRegression()
model_weighted.fit(X_audit, y_true_audit, sample_weight=weights)

print("\nModel trained with sample weights to mitigate bias")
```

#### 4.1.3 Fairness-Aware Feature Engineering

**Approach**: Remove or transform features that are proxies for protected attributes.

**Techniques**:
1. **Remove correlated features**: Drop features highly correlated with sensitive attribute
2. **Adversarial debiasing (preprocessing)**: Transform features to be less predictive of sensitive attribute
3. **Add fairness-enhancing features**: Include features that improve fairness (e.g., alternative credit data)

**Python Example**:
```python
def remove_proxy_features(X, sensitive_attr, threshold=0.5):
    """
    Remove features highly correlated with sensitive attribute.
    """
    from scipy.stats import pearsonr
    
    features_to_keep = []
    
    for feature_idx in range(X.shape[1]):
        if feature_idx == sensitive_attr:
            continue
        
        corr, p_value = pearsonr(X[:, feature_idx], X[:, sensitive_attr])
        
        if abs(corr) < threshold:
            features_to_keep.append(feature_idx)
            print(f"Feature {feature_idx}: correlation = {corr:.3f} - KEEP")
        else:
            print(f"Feature {feature_idx}: correlation = {corr:.3f} - REMOVE (proxy)")
    
    X_debiased = X[:, features_to_keep]
    
    print(f"\nReduced from {X.shape[1]} to {X_debiased.shape[1]} features")
    
    return X_debiased, features_to_keep

# Example
X_debiased, kept_features = remove_proxy_features(X_audit, sensitive_attr=0, threshold=0.5)
```

---

### 4.2 In-Processing Techniques

#### 4.2.1 Fairness Constraints in Optimization

**Approach**: Add fairness constraints to the model's optimization objective.

**Example: Demographic Parity Constraint**
$$\text{Minimize: } \mathcal{L}(\theta) + \lambda \cdot |P(\hat{Y}=1|A=0) - P(\hat{Y}=1|A=1)|$$

Where:
- $\mathcal{L}(\theta)$ = standard loss function (e.g., cross-entropy)
- $\lambda$ = fairness penalty weight
- Second term penalizes demographic parity violations

**Python Example (using Fairlearn)**:
```python
from fairlearn.reductions import ExponentiatedGradient, DemographicParity
from sklearn.linear_model import LogisticRegression

def fairness_constrained_training(X_train, y_train, sensitive_train):
    """
    Train model with demographic parity constraints.
    """
    # Base estimator
    estimator = LogisticRegression(solver='liblinear', random_state=42)
    
    # Fairness constraint
    constraint = DemographicParity()
    
    # Fair classifier
    mitigator = ExponentiatedGradient(estimator, constraint)
    mitigator.fit(X_train, y_train, sensitive_features=sensitive_train)
    
    print("Model trained with demographic parity constraints")
    
    return mitigator

# Split data
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test, sensitive_train, sensitive_test = train_test_split(
    X_audit, y_true_audit, sensitive, test_size=0.3, random_state=42
)

# Train fair model
fair_model = fairness_constrained_training(X_train, y_train, sensitive_train)

# Evaluate
y_pred_fair = fair_model.predict(X_test)

print("\nFairness metrics after in-processing mitigation:")
disparate_impact(y_pred_fair, sensitive_test)
```

#### 4.2.2 Adversarial Debiasing

**Approach**: Train model to maximize prediction accuracy while minimizing an adversary's ability to predict the sensitive attribute from predictions.

**Architecture**:
```
Input Features → Predictor Network → Predictions (ŷ)
                        ↓
                 Adversary Network → Sensitive Attribute Prediction (Â)
```

**Objective**:
- **Predictor**: Minimize prediction error, maximize adversary error
- **Adversary**: Predict sensitive attribute from predictions

**Result**: Predictions become less dependent on sensitive attribute.

**Python Example (Conceptual with TensorFlow/Keras)**:
```python
import tensorflow as tf
from tensorflow import keras

def build_adversarial_debiasing_model(input_dim, lambda_adv=1.0):
    """
    Build adversarial debiasing model.
    
    Args:
        input_dim: Number of input features
        lambda_adv: Weight for adversarial loss (higher = more fairness emphasis)
    """
    # Input
    inputs = keras.Input(shape=(input_dim,))
    
    # Predictor network
    predictor = keras.layers.Dense(64, activation='relu')(inputs)
    predictor = keras.layers.Dropout(0.3)(predictor)
    predictor = keras.layers.Dense(32, activation='relu')(predictor)
    predictor_output = keras.layers.Dense(1, activation='sigmoid', name='predictor')(predictor)
    
    # Adversary network (tries to predict sensitive attribute from predictor's hidden representation)
    # We add a gradient reversal layer (conceptually)
    adversary = keras.layers.Dense(32, activation='relu')(predictor)
    adversary_output = keras.layers.Dense(1, activation='sigmoid', name='adversary')(adversary)
    
    model = keras.Model(inputs=inputs, outputs=[predictor_output, adversary_output])
    
    # Custom loss: predictor loss - lambda * adversary loss
    # (In practice, use gradient reversal layer)
    model.compile(
        optimizer='adam',
        loss={'predictor': 'binary_crossentropy', 'adversary': 'binary_crossentropy'},
        loss_weights={'predictor': 1.0, 'adversary': -lambda_adv},  # Negative weight for adversary
        metrics={'predictor': 'accuracy', 'adversary': 'accuracy'}
    )
    
    return model

# Example usage (requires more complete implementation)
# model = build_adversarial_debiasing_model(input_dim=X_train.shape[1], lambda_adv=1.0)
# model.fit(X_train, {'predictor': y_train, 'adversary': sensitive_train}, epochs=20, batch_size=32)

print("Adversarial debiasing model architecture outlined")
print("Note: Full implementation requires gradient reversal layer")
```

---

### 4.3 Post-Processing Techniques

#### 4.3.1 Threshold Optimization

**Approach**: Use different decision thresholds for different groups to achieve fairness.

**Example**: 
- Group A: Classify as positive if P(Y=1) > 0.5
- Group B: Classify as positive if P(Y=1) > 0.3

**Achieves**: Equal opportunity or equalized odds (depending on optimization target)

**Python Example**:
```python
from sklearn.metrics import roc_curve

def optimize_thresholds_for_fairness(y_true, y_pred_proba, sensitive_attr, target_metric='equal_opportunity'):
    """
    Find group-specific thresholds that achieve fairness.
    
    Args:
        target_metric: 'equal_opportunity' (equal TPR) or 'equalized_odds' (equal TPR and FPR)
    """
    groups = np.unique(sensitive_attr)
    thresholds_dict = {}
    
    if target_metric == 'equal_opportunity':
        # Optimize for equal TPR across groups
        target_tpr = 0.8  # Desired TPR
        
        for group in groups:
            mask = (sensitive_attr == group)
            y_true_group = y_true[mask]
            y_pred_proba_group = y_pred_proba[mask]
            
            # Compute ROC curve
            fpr, tpr, thresholds = roc_curve(y_true_group, y_pred_proba_group)
            
            # Find threshold closest to target TPR
            idx = np.argmin(np.abs(tpr - target_tpr))
            optimal_threshold = thresholds[idx]
            
            thresholds_dict[group] = optimal_threshold
            
            print(f"Group {group}:")
            print(f"  Optimal Threshold: {optimal_threshold:.4f}")
            print(f"  Achieves TPR: {tpr[idx]:.4f}, FPR: {fpr[idx]:.4f}")
        
        print(f"\nThreshold difference: {abs(thresholds_dict[0] - thresholds_dict[1]):.4f}")
    
    return thresholds_dict

def apply_group_thresholds(y_pred_proba, sensitive_attr, thresholds_dict):
    """
    Apply group-specific thresholds to predictions.
    """
    y_pred_adjusted = np.zeros(len(y_pred_proba), dtype=int)
    
    for group, threshold in thresholds_dict.items():
        mask = (sensitive_attr == group)
        y_pred_adjusted[mask] = (y_pred_proba[mask] >= threshold).astype(int)
    
    return y_pred_adjusted

# Example usage
y_pred_proba_test = model_audit.predict_proba(X_test)[:, 1]

thresholds = optimize_thresholds_for_fairness(
    y_test, 
    y_pred_proba_test, 
    sensitive_test, 
    target_metric='equal_opportunity'
)

y_pred_adjusted = apply_group_thresholds(y_pred_proba_test, sensitive_test, thresholds)

print("\nFairness after threshold optimization:")
equal_opportunity(y_test, y_pred_adjusted, sensitive_test)
```

#### 4.3.2 Calibrated Equalized Odds

**Approach**: Adjust predictions post-hoc to satisfy equalized odds while maintaining calibration.

**Algorithm** (Hardt et al., 2016):
1. For each group, find optimal adjustment to predictions that:
   - Equalizes TPR and FPR across groups
   - Minimizes error

**Python Example (using AI Fairness 360)**:
```python
from aif360.algorithms.postprocessing import CalibratedEqOddsPostprocessing

def calibrated_equalized_odds_mitigation(X_train, y_train, X_test, y_test, 
                                          sensitive_train, sensitive_test, model):
    """
    Apply Calibrated Equalized Odds post-processing.
    """
    # Get predictions
    y_pred_proba_train = model.predict_proba(X_train)[:, 1]
    y_pred_proba_test = model.predict_proba(X_test)[:, 1]
    
    # Prepare datasets in AIF360 format
    df_train = pd.DataFrame(X_train)
    df_train['label'] = y_train
    df_train['score'] = y_pred_proba_train
    df_train['sensitive'] = sensitive_train
    
    df_test = pd.DataFrame(X_test)
    df_test['label'] = y_test
    df_test['score'] = y_pred_proba_test
    df_test['sensitive'] = sensitive_test
    
    dataset_train = BinaryLabelDataset(
        df=df_train,
        label_names=['label'],
        protected_attribute_names=['sensitive'],
        scores_names=['score']
    )
    
    dataset_test = BinaryLabelDataset(
        df=df_test,
        label_names=['label'],
        protected_attribute_names=['sensitive'],
        scores_names=['score']
    )
    
    # Apply Calibrated Equalized Odds
    cpp = CalibratedEqOddsPostprocessing(
        unprivileged_groups=[{'sensitive': 0}],
        privileged_groups=[{'sensitive': 1}],
        cost_constraint='weighted',  # or 'fpr', 'fnr'
        seed=42
    )
    
    cpp = cpp.fit(dataset_train, dataset_train)
    dataset_test_transformed = cpp.predict(dataset_test)
    
    y_pred_adjusted = dataset_test_transformed.labels.flatten()
    
    print("Calibrated Equalized Odds post-processing applied")
    print("\nFairness metrics after mitigation:")
    
    comprehensive_fairness_audit(X_test, y_test, y_pred_adjusted, sensitive_attr='sensitive')
    
    return y_pred_adjusted

# Example usage (requires aif360)
# y_pred_final = calibrated_equalized_odds_mitigation(
#     X_train, y_train, X_test, y_test, 
#     sensitive_train, sensitive_test, model_audit
# )

print("Calibrated Equalized Odds example outlined")
print("Requires aif360 library: pip install aif360")
```

---

## Part 5: Intersectionality and Complex Fairness

### 5.1 Understanding Intersectionality

**Definition**: Individuals can belong to multiple marginalized groups simultaneously, experiencing compounded discrimination.

**Example**:
- Black women face unique discrimination not fully captured by analyzing race or gender separately
- LGBTQ+ individuals with disabilities face intersectional barriers

**Implication for AI**: Fairness analysis should consider **intersectional groups**, not just single attributes in isolation.

### 5.2 Measuring Intersectional Fairness

**Approach**: Analyze fairness metrics for all combinations of protected attributes.

**Example**: Instead of just "Gender" and "Race", analyze:
- White Men
- White Women
- Black Men
- Black Women
- Asian Men
- Asian Women
- (and so on...)

**Challenge**: Exponential growth in subgroups, some with very small sample sizes.

**Python Example**:
```python
def intersectional_fairness_analysis(y_true, y_pred, sensitive_attrs_dict):
    """
    Analyze fairness across intersectional groups.
    
    Args:
        sensitive_attrs_dict: Dictionary of sensitive attribute names and values
                              e.g., {'gender': [0, 1, 0, ...], 'race': [0, 1, 2, ...]}
    """
    import itertools
    
    # Create intersectional groups
    attr_names = list(sensitive_attrs_dict.keys())
    attr_values = [sensitive_attrs_dict[attr] for attr in attr_names]
    
    # Create a composite label for each individual
    intersectional_groups = []
    for values in zip(*attr_values):
        group_label = "_".join([f"{attr}={val}" for attr, val in zip(attr_names, values)])
        intersectional_groups.append(group_label)
    
    intersectional_groups = np.array(intersectional_groups)
    unique_groups = np.unique(intersectional_groups)
    
    print(f"Intersectional Fairness Analysis")
    print(f"Found {len(unique_groups)} intersectional groups")
    print("=" * 80)
    
    results = []
    
    for group in unique_groups:
        mask = (intersectional_groups == group)
        n = mask.sum()
        
        if n < 10:  # Skip groups with very few samples
            continue
        
        y_true_group = y_true[mask]
        y_pred_group = y_pred[mask]
        
        positive_rate = np.mean(y_pred_group)
        accuracy = np.mean(y_true_group == y_pred_group)
        
        if np.sum(y_true_group) > 0:
            tpr = np.sum((y_true_group == 1) & (y_pred_group == 1)) / np.sum(y_true_group)
        else:
            tpr = np.nan
        
        if np.sum(y_true_group == 0) > 0:
            fpr = np.sum((y_true_group == 0) & (y_pred_group == 1)) / np.sum(y_true_group == 0)
        else:
            fpr = np.nan
        
        results.append({
            'Group': group,
            'N': n,
            'Positive Rate': positive_rate,
            'Accuracy': accuracy,
            'TPR': tpr,
            'FPR': fpr
        })
    
    df_results = pd.DataFrame(results)
    
    print(df_results.to_string(index=False, float_format='%.3f'))
    
    print("\n" + "=" * 80)
    print("Interpretation:")
    print("- Look for large disparities in Positive Rate, Accuracy, TPR, or FPR")
    print("- Groups with very different rates may experience intersectional bias")
    print("- Small group sizes (N) may have unreliable estimates")
    
    return df_results

# Example usage
gender = np.random.binomial(1, 0.5, 500)
race = np.random.choice([0, 1, 2], size=500)  # 3 racial groups

y_true_inter = np.random.binomial(1, 0.3, 500)
y_pred_inter = np.random.binomial(1, 0.35, 500)

sensitive_attrs = {'gender': gender, 'race': race}
intersectional_results = intersectional_fairness_analysis(y_true_inter, y_pred_inter, sensitive_attrs)
```

### 5.3 Mitigating Intersectional Bias

**Challenges**:
- Small sample sizes for some intersectional groups
- Exponential number of groups
- Trade-offs between intersectional and single-attribute fairness

**Strategies**:

1. **Hierarchical Fairness**: Ensure fairness at single-attribute level, then refine for intersectional groups with sufficient data

2. **Multi-Group Fairness**: Explicitly optimize for fairness across all intersectional groups (not just pairwise)

3. **Stratified Approaches**: Apply mitigation techniques within intersectional strata

4. **Transfer Learning**: Use data from larger groups to improve models for smaller intersectional groups

**Python Example (Stratified Re-weighting)**:
```python
def intersectional_reweighting(sensitive_attrs_dict):
    """
    Compute sample weights to balance all intersectional groups.
    """
    # Create intersectional group labels
    attr_values = [sensitive_attrs_dict[attr] for attr in sensitive_attrs_dict.keys()]
    intersectional_groups = np.array([
        "_".join([str(val) for val in values]) 
        for values in zip(*attr_values)
    ])
    
    # Compute balanced weights
    weights = compute_sample_weight('balanced', intersectional_groups)
    
    print("Intersectional Reweighting:")
    unique_groups = np.unique(intersectional_groups)
    
    for group in unique_groups:
        mask = (intersectional_groups == group)
        print(f"  {group}: n={mask.sum()}, avg_weight={weights[mask].mean():.4f}")
    
    return weights

# Example
intersectional_weights = intersectional_reweighting(sensitive_attrs)

# Use these weights in model training
model_intersectional = LogisticRegression()
model_intersectional.fit(X_audit, y_true_audit, sample_weight=intersectional_weights)

print("\nModel trained with intersectional reweighting")
```

---

## Part 6: Real-World Case Studies

### Case Study 1: Amazon Hiring Tool (2014-2018)

**System**: ML model to screen resumes and rank candidates.

**Data**: 10 years of historical hiring data (predominantly male hires in technical roles).

**Bias Discovered**:
- Model penalized resumes containing "women's" (e.g., "women's chess club")
- Downgraded graduates of all-women's colleges
- Gender bias despite gender not being explicit feature (proxy variables)

**Root Causes**:
1. **Historical Bias**: Training data reflected male-dominated hiring history
2. **Proxy Variables**: Terms and patterns associated with women were implicitly learned
3. **Insufficient Testing**: Bias not detected before internal use

**Attempted Mitigation**:
- Removed explicit gender indicators and terms like "women's"
- **Failed**: Model found other proxies (e.g., language patterns, activities)

**Outcome**:
- Tool scrapped in 2018
- Amazon stated it was never used as sole decision-maker (but likely influenced decisions)

**Lessons**:
1. **Historical data perpetuates past discrimination**
2. **Removing sensitive features is insufficient** - proxies remain
3. **Thorough bias testing is essential before deployment**
4. **Iterative mitigation is often necessary**

### Case Study 2: Facebook Ad Delivery Bias (2019)

**System**: Algorithm determines which users see job, housing, and credit ads.

**Bias Discovered** (ProPublica and researchers):
- Job ads for mechanics and taxi drivers shown predominantly to men
- Job ads for nurses and secretaries shown predominantly to women
- Housing ads shown differentially by race, even when advertisers didn't intend discrimination

**Root Cause**:
- **Optimization for engagement**: Algorithm learned that certain demographics were more likely to click certain ad types
- **Feedback loop**: Historical engagement patterns (reflecting societal biases) were amplified

**Legal Issue**:
- Violates U.S. Fair Housing Act and employment discrimination laws
- Even unintentional algorithmic discrimination is illegal in these domains

**Resolution**:
- $14.25M settlement with U.S. Department of Justice
- Facebook agreed to implement fairness tools for housing, employment, and credit ads
- Special ad categories with limited targeting options

**Lessons**:
1. **Optimizing for engagement can perpetuate bias**
2. **Ad delivery algorithms are subject to anti-discrimination laws**
3. **Intent doesn't matter - outcomes do**
4. **Legal compliance requires proactive fairness measures**

### Case Study 3: Healthcare Algorithm Bias (2019, Science)

**System**: Commercial algorithm used by hospitals to identify patients for "high-risk care management" programs.

**Data**: Insurance claims, healthcare utilization, costs.

**Bias Discovered**:
- At the same risk score, Black patients were significantly sicker than white patients
- **Impact**: Black patients had to be much sicker to receive the same care management

**Root Cause**:
- **Measurement Bias**: Algorithm predicted healthcare costs as proxy for health needs
- **But**: Black patients have lower costs not because they're healthier, but due to systemic barriers to care (less access, medical mistrust)
- **Result**: Costs were a biased proxy for health needs

**Magnitude**:
- Reducing bias could increase the number of Black patients identified for programs by **46%**

**Mitigation Implemented**:
- Replaced cost-based target with direct health measures (chronic conditions, vital signs)
- Resulted in more equitable identification of high-risk patients

**Lessons**:
1. **Proxies can be deeply biased, even if they seem "objective"**
2. **Healthcare disparities mean common proxies (costs, utilization) are problematic**
3. **Involving domain experts (clinicians familiar with health equity) is crucial**
4. **Better measurement of ground truth is key**

### Case Study 4: Gender Shades - Facial Recognition Bias (2018)

**Study**: Joy Buolamwini and Timnit Gebru evaluated commercial facial recognition systems.

**Systems Tested**: IBM, Microsoft, Face++, others.

**Bias Discovered**:
- **Intersectional disparities**: Error rates up to **34% for darker-skinned women** vs. **0.8% for lighter-skinned men**
- Gender classification errors higher for women, especially dark-skinned women

**Root Cause**:
- **Representation Bias**: Training datasets (e.g., common face datasets) over-represented lighter-skinned men
- Models performed well on over-represented groups, poorly on under-represented

**Impact**:
- Publicized study led to widespread awareness of facial recognition bias
- Companies improved systems (IBM, Microsoft reduced disparities significantly after study)
- Contributed to bans or moratoria on facial recognition in some cities/contexts

**Follow-Up**: Microsoft and IBM subsequently improved models, achieving much lower error disparities.

**Lessons**:
1. **Dataset diversity is critical**
2. **Disaggregated testing (by demographic group) is essential**
3. **Intersectional analysis reveals hidden disparities**
4. **Public accountability drives improvement**

---

## Part 7: Practical Implementation Guide

### 7.1 Bias Detection and Mitigation Workflow

**Step-by-Step Process**:

```markdown
## Bias Detection and Mitigation Workflow

### Phase 1: Planning (Before Data Collection)
1. **Identify Stakeholders and Potential Harms**
   - Who will be affected by this AI system?
   - What are the potential biases and harms?
   - Which protected attributes are relevant?

2. **Define Fairness Criteria**
   - Which fairness metrics are most appropriate for this application?
   - What are acceptable thresholds?
   - How will you balance accuracy vs. fairness?

3. **Plan Data Collection**
   - How will you ensure diverse, representative data?
   - What sensitive attributes need to be collected (for testing, even if not used in model)?

### Phase 2: Data Analysis (After Data Collection, Before Modeling)
4. **Exploratory Data Analysis for Bias**
   - Check representation of protected groups
   - Analyze outcome distributions by group
   - Identify proxy variables
   - Assess data quality by group

5. **Document Findings**
   - Create a bias assessment report
   - Identify risks and mitigation strategies

### Phase 3: Modeling
6. **Baseline Model Development**
   - Train initial model without fairness interventions
   - Establish baseline performance and fairness metrics

7. **Bias Testing**
   - Comprehensive fairness audit (all relevant metrics)
   - Disaggregated performance analysis
   - Intersectional analysis if applicable

8. **Bias Mitigation**
   - Apply pre-processing, in-processing, or post-processing techniques
   - Iterate and test again
   - Balance accuracy and fairness trade-offs

9. **Model Selection**
   - Choose model that best balances performance, fairness, and interpretability
   - Document rationale for trade-offs

### Phase 4: Pre-Deployment
10. **Adversarial Testing**
    - Test edge cases and vulnerable subgroups
    - Simulate real-world deployment conditions

11. **Stakeholder Review**
    - Present findings to ethics board, legal, affected communities
    - Incorporate feedback

12. **Documentation**
    - Create model card documenting intended use, fairness testing, limitations
    - Prepare user-facing explanations

### Phase 5: Deployment
13. **Gradual Rollout**
    - Pilot with subset of users
    - Monitor fairness metrics closely

14. **Human Oversight**
    - Implement human review for high-stakes decisions
    - Train operators on bias risks and when to override

### Phase 6: Monitoring (Post-Deployment)
15. **Continuous Monitoring**
    - Track fairness metrics weekly/monthly
    - Set up alerts for threshold violations
    - Disaggregate performance metrics

16. **Feedback Mechanisms**
    - Analyze user complaints and appeals
    - Look for patterns by demographic group

17. **Periodic Re-Audits**
    - Comprehensive fairness audit quarterly/annually
    - Compare to baseline to detect drift

18. **Iterative Improvement**
    - Update model and mitigation strategies based on monitoring
    - Repeat bias testing and mitigation as needed
```

### 7.2 Building a Bias Testing Toolkit

**Essential Tools**:

```python
# File: bias_testing_toolkit.py

import numpy as np
import pandas as pd
from sklearn.metrics import confusion_matrix, accuracy_score
from scipy.stats import chi2_contingency, pearsonr

class BiasTester:
    """
    Comprehensive bias testing toolkit.
    """
    
    def __init__(self, y_true, y_pred, y_pred_proba=None):
        """
        Initialize with predictions and ground truth.
        
        Args:
            y_true: True labels
            y_pred: Predicted labels (binary)
            y_pred_proba: Predicted probabilities (optional, for some metrics)
        """
        self.y_true = np.array(y_true)
        self.y_pred = np.array(y_pred)
        self.y_pred_proba = np.array(y_pred_proba) if y_pred_proba is not None else None
    
    def disparate_impact(self, sensitive_attr, unprivileged=0, privileged=1):
        """Calculate disparate impact ratio."""
        unprivileged_mask = (sensitive_attr == unprivileged)
        privileged_mask = (sensitive_attr == privileged)
        
        unprivileged_rate = np.mean(self.y_pred[unprivileged_mask])
        privileged_rate = np.mean(self.y_pred[privileged_mask])
        
        di_ratio = unprivileged_rate / privileged_rate if privileged_rate > 0 else 0
        
        return {
            'disparate_impact_ratio': di_ratio,
            'unprivileged_rate': unprivileged_rate,
            'privileged_rate': privileged_rate,
            'passes_four_fifths': di_ratio >= 0.8
        }
    
    def equal_opportunity_difference(self, sensitive_attr, unprivileged=0, privileged=1):
        """Calculate difference in true positive rates."""
        groups = [unprivileged, privileged]
        tprs = []
        
        for group in groups:
            mask = (sensitive_attr == group)
            y_true_group = self.y_true[mask]
            y_pred_group = self.y_pred[mask]
            
            positives = (y_true_group == 1)
            if positives.sum() > 0:
                tpr = (y_pred_group[positives] == 1).sum() / positives.sum()
            else:
                tpr = np.nan
            
            tprs.append(tpr)
        
        return {
            'tpr_unprivileged': tprs[0],
            'tpr_privileged': tprs[1],
            'equal_opportunity_difference': abs(tprs[0] - tprs[1]),
            'fair': abs(tprs[0] - tprs[1]) < 0.1
        }
    
    def equalized_odds(self, sensitive_attr, unprivileged=0, privileged=1):
        """Calculate TPR and FPR differences (equalized odds)."""
        groups = [unprivileged, privileged]
        tprs, fprs = [], []
        
        for group in groups:
            mask = (sensitive_attr == group)
            y_true_group = self.y_true[mask]
            y_pred_group = self.y_pred[mask]
            
            tn, fp, fn, tp = confusion_matrix(y_true_group, y_pred_group).ravel()
            
            tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
            fpr = fp / (fp + tn) if (fp + tn) > 0 else 0
            
            tprs.append(tpr)
            fprs.append(fpr)
        
        tpr_diff = abs(tprs[0] - tprs[1])
        fpr_diff = abs(fprs[0] - fprs[1])
        
        return {
            'tpr_unprivileged': tprs[0],
            'tpr_privileged': tprs[1],
            'tpr_difference': tpr_diff,
            'fpr_unprivileged': fprs[0],
            'fpr_privileged': fprs[1],
            'fpr_difference': fpr_diff,
            'fair': (tpr_diff < 0.1) and (fpr_diff < 0.1)
        }
    
    def demographic_parity(self, sensitive_attr, unprivileged=0, privileged=1):
        """Calculate demographic parity difference."""
        unprivileged_mask = (sensitive_attr == unprivileged)
        privileged_mask = (sensitive_attr == privileged)
        
        unprivileged_rate = np.mean(self.y_pred[unprivileged_mask])
        privileged_rate = np.mean(self.y_pred[privileged_mask])
        
        dp_diff = abs(unprivileged_rate - privileged_rate)
        
        return {
            'unprivileged_rate': unprivileged_rate,
            'privileged_rate': privileged_rate,
            'demographic_parity_difference': dp_diff,
            'fair': dp_diff < 0.1
        }
    
    def group_accuracy_parity(self, sensitive_attr, groups=None):
        """Check if accuracy is similar across groups."""
        if groups is None:
            groups = np.unique(sensitive_attr)
        
        accuracies = {}
        for group in groups:
            mask = (sensitive_attr == group)
            acc = accuracy_score(self.y_true[mask], self.y_pred[mask])
            accuracies[f'group_{group}'] = acc
        
        acc_values = list(accuracies.values())
        acc_diff = max(acc_values) - min(acc_values)
        
        return {
            **accuracies,
            'accuracy_difference': acc_diff,
            'fair': acc_diff < 0.05
        }
    
    def full_audit(self, sensitive_attr, unprivileged=0, privileged=1, report=True):
        """Run all fairness tests and generate report."""
        results = {
            'disparate_impact': self.disparate_impact(sensitive_attr, unprivileged, privileged),
            'demographic_parity': self.demographic_parity(sensitive_attr, unprivileged, privileged),
            'equal_opportunity': self.equal_opportunity_difference(sensitive_attr, unprivileged, privileged),
            'equalized_odds': self.equalized_odds(sensitive_attr, unprivileged, privileged),
            'accuracy_parity': self.group_accuracy_parity(sensitive_attr)
        }
        
        if report:
            self._print_report(results)
        
        return results
    
    def _print_report(self, results):
        """Print formatted audit report."""
        print("=" * 70)
        print("BIAS AUDIT REPORT")
        print("=" * 70)
        
        print("\n1. DISPARATE IMPACT")
        print("-" * 70)
        di = results['disparate_impact']
        print(f"Disparate Impact Ratio: {di['disparate_impact_ratio']:.4f}")
        print(f"Status: {'✓ PASS' if di['passes_four_fifths'] else '✗ FAIL'} (threshold: >= 0.80)")
        
        print("\n2. DEMOGRAPHIC PARITY")
        print("-" * 70)
        dp = results['demographic_parity']
        print(f"Difference: {dp['demographic_parity_difference']:.4f}")
        print(f"Status: {'✓ PASS' if dp['fair'] else '✗ FAIL'} (threshold: < 0.10)")
        
        print("\n3. EQUAL OPPORTUNITY")
        print("-" * 70)
        eo = results['equal_opportunity']
        print(f"TPR Difference: {eo['equal_opportunity_difference']:.4f}")
        print(f"Status: {'✓ PASS' if eo['fair'] else '✗ FAIL'} (threshold: < 0.10)")
        
        print("\n4. EQUALIZED ODDS")
        print("-" * 70)
        eq = results['equalized_odds']
        print(f"TPR Difference: {eq['tpr_difference']:.4f}")
        print(f"FPR Difference: {eq['fpr_difference']:.4f}")
        print(f"Status: {'✓ PASS' if eq['fair'] else '✗ FAIL'} (threshold: < 0.10 for both)")
        
        print("\n5. ACCURACY PARITY")
        print("-" * 70)
        ap = results['accuracy_parity']
        print(f"Accuracy Difference: {ap['accuracy_difference']:.4f}")
        print(f"Status: {'✓ PASS' if ap['fair'] else '✗ FAIL'} (threshold: < 0.05)")
        
        print("\n" + "=" * 70)
        
        # Overall assessment
        all_fair = all([
            di['passes_four_fifths'],
            dp['fair'],
            eo['fair'],
            eq['fair'],
            ap['fair']
        ])
        
        if all_fair:
            print("✓ OVERALL: Model passes all fairness checks")
        else:
            print("✗ OVERALL: Model has fairness issues - mitigation recommended")
        
        print("=" * 70)

# Example usage
if __name__ == "__main__":
    # Synthetic data
    np.random.seed(42)
    n = 1000
    
    y_true_test = np.random.binomial(1, 0.3, n)
    y_pred_test = np.random.binomial(1, 0.35, n)
    sensitive_test = np.random.binomial(1, 0.5, n)
    
    # Introduce bias
    mask = (sensitive_test == 1) & (y_pred_test == 1)
    y_pred_test[mask] = np.random.binomial(1, 0.7, mask.sum())
    
    # Run audit
    tester = BiasTester(y_true_test, y_pred_test)
    results = tester.full_audit(sensitive_test, unprivileged=0, privileged=1)
```

**Usage**:
```python
# In your project
from bias_testing_toolkit import BiasTester

# After training model
y_pred = model.predict(X_test)

tester = BiasTester(y_test, y_pred)
audit_results = tester.full_audit(sensitive_test)
```

---

## Module Summary

### Key Takeaways

1. **Bias is Multi-Faceted**: Data bias, algorithmic bias, and human bias can all contribute to unfair AI systems. Understanding the bias pipeline is essential.

2. **Fairness is Context-Dependent**: There's no universal definition of fairness. Choose metrics based on application context, stakeholder values, and legal requirements.

3. **Trade-Offs are Inevitable**: Perfect fairness across all metrics is mathematically impossible. You must prioritize based on ethical considerations and consequences.

4. **Bias Testing is Non-Negotiable**: Comprehensive fairness audits should be standard practice, especially for high-stakes applications. Disaggregate performance by demographic group.

5. **Mitigation Has Three Stages**: Pre-processing (data), in-processing (algorithm), and post-processing (outputs) techniques each have trade-offs. Often, a combination is most effective.

6. **Intersectionality Matters**: Analyze fairness for intersectional groups, not just single protected attributes, to uncover compounded discrimination.

7. **Monitoring is Continuous**: Bias can emerge or worsen post-deployment due to feedback loops and data drift. Continuous monitoring and periodic re-audits are essential.

8. **Real-World Failures Teach**: Case studies from Amazon, Facebook, healthcare, and facial recognition show the severe consequences of biased AI and the importance of proactive fairness measures.

9. **Tools Are Available**: Libraries like AI Fairness 360, Fairlearn, and What-If Tool make bias detection and mitigation accessible. Use them.

10. **Ethical and Legal Imperative**: Beyond technical challenges, addressing bias is a legal requirement in many domains and an ethical obligation to affected individuals and society.

### Reflection Questions

1. What types of bias are most likely in your AI systems? How would you detect them?

2. Which fairness metrics are most appropriate for your use case? Why?

3. What trade-offs between accuracy and fairness are acceptable in your context? Who should decide?

4. How would you ensure diverse and representative training data?

5. What intersectional groups are relevant for your applications? Do you have sufficient data to analyze them?

### Action Items

- [ ] **Implement BiasTester toolkit** for your models
- [ ] **Conduct comprehensive fairness audit** on existing AI systems
- [ ] **Identify and document** trade-offs between accuracy and fairness
- [ ] **Establish fairness thresholds** and monitoring processes
- [ ] **Train team** on bias detection and mitigation techniques
- [ ] **Create model cards** documenting fairness testing for deployed models
- [ ] **Set up continuous monitoring** dashboard for fairness metrics
- [ ] **Review data collection** practices for representation and quality

---

## Next Steps

In **Module 3: AI Security & Privacy**, we'll explore:

- Data protection and privacy-preserving AI techniques
- Security vulnerabilities in AI systems (adversarial attacks, poisoning, model extraction)
- GDPR and privacy regulations
- Differential privacy, federated learning, secure multi-party computation
- Privacy impact assessments
- Secure AI development lifecycle

### Preview Exercise

**Bias Mitigation Challenge**:

You've identified gender bias in a hiring algorithm (disparate impact ratio = 0.65, below the 0.80 threshold).

1. What pre-processing techniques would you try first?
2. If pre-processing doesn't fully solve the issue, what in-processing or post-processing approaches would you consider?
3. How would you balance fairness improvements with potential accuracy trade-offs?
4. What monitoring would you implement post-deployment?

Prepare your approach, and we'll discuss strategies in the next module's introduction.

---

**Congratulations on completing Module 2!** You now have practical tools and techniques for detecting and mitigating bias in AI systems. You understand the complexities of defining fairness, the mathematical trade-offs involved, and real-world lessons from significant bias incidents.

**Continue your journey** → Proceed to **Module 3: AI Security & Privacy**
