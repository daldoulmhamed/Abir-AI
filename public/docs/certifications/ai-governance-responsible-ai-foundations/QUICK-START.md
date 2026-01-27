# AI Governance & Responsible AI Foundations - Quick Start Guide

## 🚀 Quick Reference

This guide provides rapid-access templates, checklists, and tools for implementing responsible AI in your organization. Use this as a companion to the full certification modules for quick lookups and practical implementation.

---

## 📋 Table of Contents

1. [Essential Checklists](#essential-checklists)
2. [Quick Templates](#quick-templates)
3. [Fairness Metrics Quick Reference](#fairness-metrics-quick-reference)
4. [GDPR Compliance Quick Guide](#gdpr-compliance-quick-guide)
5. [EU AI Act Risk Classification](#eu-ai-act-risk-classification)
6. [Code Snippets](#code-snippets)
7. [Tool Selection Guide](#tool-selection-guide)
8. [Emergency Response](#emergency-response)

---

## Essential Checklists

### ✅ New AI Project Checklist

**Before Starting Development**:
- [ ] Problem clearly defined and AI is appropriate solution
- [ ] Stakeholders identified (users, subjects, affected parties)
- [ ] Ethical "should we build this?" assessment completed
- [ ] Data availability and quality verified
- [ ] Legal basis for data processing identified (if personal data)
- [ ] Initial risk classification (EU AI Act: prohibited/high/limited/minimal)
- [ ] Project submitted to AI governance intake process

**During Development**:
- [ ] Data provenance documented (sources, collection methods, dates)
- [ ] Bias in training data assessed and documented
- [ ] Model architecture and hyperparameters documented
- [ ] Fairness testing conducted (disparate impact, demographic parity, etc.)
- [ ] Explainability implemented (SHAP, LIME, or inherent interpretability)
- [ ] Adversarial robustness testing conducted
- [ ] Privacy attack testing conducted (if applicable)
- [ ] Model card created
- [ ] Technical documentation completed

**Before Deployment**:
- [ ] Pre-deployment review completed (AI Review Board approval)
- [ ] GDPR compliance verified (legal basis, DPIA if required, data subject rights processes)
- [ ] EU AI Act compliance verified (conformity assessment if high-risk)
- [ ] Human oversight approach defined and implemented
- [ ] Monitoring plan established (performance, fairness, security, drift)
- [ ] Incident response process defined
- [ ] User-facing transparency (privacy notice, AI disclosure) prepared
- [ ] Deployment approved by governance bodies

**Post-Deployment**:
- [ ] Continuous monitoring active (performance, fairness, security)
- [ ] Periodic audits scheduled (quarterly for high-risk)
- [ ] Incident tracking in place
- [ ] Model retraining triggers defined

---

### ✅ GDPR Compliance Checklist for AI

- [ ] **Legal Basis**: Identified lawful basis (Article 6)—consent, contract, legitimate interest, etc.
- [ ] **DPIA**: Conducted Data Protection Impact Assessment (if high-risk processing)
- [ ] **Data Minimization**: Only necessary data collected and processed
- [ ] **Purpose Limitation**: Processing for specified, explicit, legitimate purposes
- [ ] **Transparency**: Privacy notice provided explaining AI use, logic, significance
- [ ] **Data Subject Rights**: Processes for access, rectification, erasure, portability, objection
- [ ] **Automated Decision-Making (Article 22)**: If applicable, exception identified (contract/law/consent) and safeguards implemented (human intervention, contest, express view)
- [ ] **Special Category Data (Article 9)**: If processing sensitive data, exception identified and additional safeguards implemented
- [ ] **Security**: Encryption, access controls, adversarial robustness, incident response
- [ ] **Data Breach Notification**: Process for notifying authority (within 72 hours) and data subjects
- [ ] **Records of Processing**: Documented (Article 30)
- [ ] **DPO**: Data Protection Officer designated (if required) and consulted

---

### ✅ EU AI Act High-Risk Compliance Checklist

- [ ] **Risk Management System**: Established, documented, maintained throughout lifecycle
- [ ] **Data Governance**: Training data relevant, representative, free of errors, complete; bias examined
- [ ] **Technical Documentation**: Comprehensive (Annex IV)—system description, development process, data, risk management, testing
- [ ] **Record-Keeping**: Automatic logging (operation period, inputs, outputs, human verification)
- [ ] **Transparency**: Instructions for use, user information (purpose, accuracy, limitations, human oversight)
- [ ] **Human Oversight**: Measures for natural persons to oversee system (HITL, HOTL, HIC)
- [ ] **Accuracy, Robustness, Cybersecurity**: Tested and validated
- [ ] **Conformity Assessment**: Conducted (internal control or notified body)
- [ ] **CE Marking**: Affixed after successful conformity assessment
- [ ] **EU Database Registration**: Registered in EU high-risk AI database
- [ ] **Post-Market Monitoring**: System for monitoring performance post-deployment
- [ ] **Serious Incident Reporting**: Procedure for reporting to authorities

---

### ✅ Bias Testing Checklist

- [ ] **Protected Attributes Identified**: Race, gender, age, disability, etc.
- [ ] **Training Data Representativeness**: Checked demographics vs. population distribution
- [ ] **Data Balance**: Assessed class balance within demographic groups
- [ ] **Fairness Metrics Calculated**:
  - [ ] Disparate Impact Ratio (0.80-1.20 acceptable)
  - [ ] Demographic Parity Difference (<0.10 acceptable)
  - [ ] Equalized Odds Difference (<0.10 acceptable)
  - [ ] Equal Opportunity Difference (<0.10 acceptable)
  - [ ] Calibration (by group)
- [ ] **Intersectional Analysis**: Tested combinations of protected attributes (e.g., race + gender)
- [ ] **Mitigation Applied** (if needed): Reweighting, adversarial debiasing, threshold optimization
- [ ] **Post-Mitigation Testing**: Verified fairness metrics improved, accuracy acceptable
- [ ] **Fairness Results Documented**: In model card and technical documentation
- [ ] **Continuous Monitoring**: Fairness metrics tracked post-deployment

---

## Quick Templates

### Template: Responsible AI Principles (One-Pager)

```markdown
# [Organization] Responsible AI Principles

## Our Commitment
At [Organization], we develop AI that is ethical, transparent, fair, and accountable.

## Seven Principles

**1. Human-Centered**: AI enhances human capabilities, respects dignity, serves the common good.

**2. Fair & Non-Discriminatory**: AI treats all individuals fairly, does not discriminate.

**3. Transparent & Explainable**: AI use is disclosed; decisions are explainable.

**4. Accountable & Governed**: Clear accountability, governance, and oversight.

**5. Private & Secure**: AI protects privacy, is secure against threats.

**6. Robust & Reliable**: AI is accurate, reliable, and resilient.

**7. Sustainable & Responsible**: AI considers environmental and societal impact.

## Accountability
All employees uphold these principles. Report violations to [AI Governance Manager / Ethics Hotline].

## Review
Reviewed annually.
```

---

### Template: AI Project Intake Form (One-Page)

```markdown
# AI Project Intake Form

**Submitter**: ___________ **Date**: ___________

## Project Overview
**Name**: ___________
**Purpose**: ___________ (What problem does this solve?)
**Expected Benefits**: ___________

## AI System
**AI Technique**: ☐ Supervised ML  ☐ Unsupervised  ☐ Deep Learning  ☐ NLP  ☐ Computer Vision  ☐ Generative AI  ☐ Other
**Inputs**: ___________ (What data?)
**Outputs**: ___________ (What decisions/predictions?)
**Human Involvement**: ☐ Fully automated  ☐ Human-in-the-loop  ☐ Advisory only

## Impact
**Who is affected?**: ☐ Employees  ☐ Customers  ☐ Public  ☐ Vulnerable groups
**Significance**: ☐ High-stakes (employment, credit, medical)  ☐ Medium  ☐ Low

## Data
**Personal Data?**: ☐ Yes  ☐ No
**Sensitive Categories** (GDPR Article 9)?: ☐ Yes → ___ ☐ No

## Risk Flags
☐ High-risk under EU AI Act
☐ Processing special category data
☐ Automated decision-making with legal/significant effects (GDPR Article 22)
☐ Biometric identification
☐ Significant reputational risk
☐ Novel technique with unclear ethical implications

**Next Steps**: AI Governance Manager will review and schedule AI Review Board meeting.
```

---

### Template: Model Card (Condensed)

```markdown
# Model Card: [Model Name]

## Model Details
**Version**: ___ | **Date**: ___ | **Owner**: ___ | **Contact**: ___

## Intended Use
**Primary Use**: ___
**Out-of-Scope**: ___

## Training Data
**Source**: ___ | **Size**: ___ records | **Date Range**: ___
**Demographics**: [Distribution]

## Performance
**Overall Accuracy**: ___
**Precision**: ___ | **Recall**: ___ | **F1**: ___

**Disaggregated Performance**:
| Group | Accuracy | Precision | Recall |
|-------|----------|-----------|--------|
| Group A | ___ | ___ | ___ |
| Group B | ___ | ___ | ___ |

## Fairness
**Disparate Impact Ratio**: ___ (0.80-1.20 acceptable)
**Demographic Parity Difference**: ___ (<0.10 acceptable)

## Limitations
- ___
- ___

## Ethical Considerations
- ___

## Contact
For questions: ___@___.com
```

---

### Template: Algorithmic Impact Assessment (2-Page)

```markdown
# Algorithmic Impact Assessment (AIA)

**System Name**: ___
**Purpose**: ___
**Owner**: ___
**Date**: ___

## Stakeholders
☐ Users  ☐ Subjects  ☐ Customers  ☐ Employees  ☐ Vulnerable Groups  ☐ Public

## Beneficial Impacts
- Efficiency: ___
- Accuracy: ___
- Accessibility: ___
- Other: ___

## Harmful Impacts

### Accuracy Risks
**Potential**: False positives/negatives, data drift, edge cases
**Severity**: ☐ Low  ☐ Medium  ☐ High  ☐ Critical
**Mitigation**: ___

### Fairness Risks
**Potential**: Discrimination based on race, gender, age, etc.
**Severity**: ☐ Low  ☐ Medium  ☐ High  ☐ Critical
**Mitigation**: ___

### Privacy Risks
**Potential**: Data breaches, re-identification, adversarial attacks
**Severity**: ☐ Low  ☐ Medium  ☐ High  ☐ Critical
**Mitigation**: ___

### Transparency Risks
**Potential**: Opacity, no human override, lack of informed consent
**Severity**: ☐ Low  ☐ Medium  ☐ High  ☐ Critical
**Mitigation**: ___

## Alternatives Considered
☐ Manual process  ☐ Rule-based system  ☐ Less invasive data  ☐ Human-in-the-loop
**Justification for AI approach**: ___

## Monitoring
**Performance**: ☐ Continuous  **Fairness**: ☐ Continuous  **Incidents**: ☐ Tracked
**Review Schedule**: ☐ Quarterly  ☐ Annually

## Decision
**Risk Level**: ☐ Low  ☐ Medium  ☐ High  ☐ Critical
**Approval**: ☐ Approved  ☐ Approved with conditions  ☐ Deferred  ☐ Rejected
**Approved by**: ___ **Date**: ___
```

---

## Fairness Metrics Quick Reference

### Disparate Impact Ratio (DI)
**Formula**: $\text{DI} = \frac{P(\hat{Y}=1 | A=0)}{P(\hat{Y}=1 | A=1)}$

**Interpretation**:
- DI = 1.0: Perfect parity
- DI < 0.80: Adverse impact (unprivileged group disadvantaged)
- DI > 1.20: Reverse adverse impact (privileged group disadvantaged)

**When to Use**: Binary classification with positive outcome (loan approval, hiring, admission)

---

### Demographic Parity Difference (DPD)
**Formula**: $\text{DPD} = P(\hat{Y}=1 | A=0) - P(\hat{Y}=1 | A=1)$

**Interpretation**:
- DPD = 0: Perfect demographic parity
- |DPD| < 0.10: Generally acceptable
- |DPD| ≥ 0.10: Significant disparity

**When to Use**: When you want groups to have equal positive prediction rates

---

### Equalized Odds Difference (EOD)
**Formula**: $\text{EOD} = |TPR_0 - TPR_1| + |FPR_0 - FPR_1|$

Where $TPR = P(\hat{Y}=1 | Y=1, A)$, $FPR = P(\hat{Y}=1 | Y=0, A)$

**Interpretation**:
- EOD = 0: Perfect equalized odds (equal TPR and FPR across groups)
- EOD < 0.10: Generally acceptable

**When to Use**: When you want equal error rates across groups (both false positives and false negatives)

---

### Equal Opportunity Difference (EOppD)
**Formula**: $\text{EOppD} = |TPR_0 - TPR_1|$

**Interpretation**:
- EOppD = 0: Perfect equal opportunity
- EOppD < 0.10: Generally acceptable

**When to Use**: When you want equal true positive rates (qualified individuals equally likely to be selected)

---

### Calibration
**Check**: Within each group, among individuals predicted to have probability $p$, approximately fraction $p$ should have positive outcome.

**When to Use**: When prediction probabilities must be trustworthy for decision-making

---

## GDPR Compliance Quick Guide

### Legal Bases (Article 6) - Choose One

| Legal Basis | When to Use | Example for AI |
|-------------|-------------|----------------|
| **Consent** | Optional features, marketing, profiling | Personalized recommendations (user can opt out) |
| **Contract** | Necessary for contract performance | Fraud detection for payment processing |
| **Legal Obligation** | Required by law | AML checks, tax reporting |
| **Vital Interests** | Protect life/health | Medical emergency AI |
| **Public Interest** | Government/official authority | Public services AI |
| **Legitimate Interest** | Necessary for legitimate interests (pass LIA) | Fraud detection, service improvement |

**Note**: If using Legitimate Interest, conduct Legitimate Interest Assessment (LIA).

---

### Article 22 Flowchart

```
Is the decision SOLELY AUTOMATED?
(No meaningful human involvement)
    ↓ Yes
Does it produce LEGAL or SIMILARLY SIGNIFICANT effects?
(Employment, credit, insurance, housing, government benefits, etc.)
    ↓ Yes
Article 22 APPLIES
    ↓
Is there an EXCEPTION?
☐ Necessary for contract (Article 22(2)(a))
☐ Authorized by EU/Member State law (Article 22(2)(b))
☐ Based on explicit consent (Article 22(2)(c))
    ↓ Yes (one of the above)
IMPLEMENT SAFEGUARDS:
☐ Right to obtain human intervention
☐ Right to express point of view
☐ Right to contest decision
    ↓
DEPLOY with safeguards
    ↓ No exception applies
CANNOT USE solely automated decision-making
```

---

### DPIA Required? (Article 35)

**DPIA Required If**:
- [ ] Systematic and extensive automated processing, including profiling, producing legal/significant effects
- [ ] Large-scale processing of special category data (Article 9) or criminal conviction data
- [ ] Systematic monitoring of publicly accessible area on large scale

**DPIA Recommended If**:
- [ ] Use of new technologies
- [ ] Processing prevents data subjects from exercising rights/using services
- [ ] Profiling vulnerable individuals (children)
- [ ] Large-scale processing of personal data

**If DPIA Required**:
1. Describe processing and purposes
2. Assess necessity and proportionality
3. Assess risks to individuals' rights and freedoms
4. Identify measures to address risks
5. Consult DPO (if applicable)
6. Consult supervisory authority if high residual risk

---

## EU AI Act Risk Classification

### Quick Risk Classifier

**PROHIBITED** (Do Not Deploy):
- [ ] Subliminal manipulation causing harm
- [ ] Exploiting vulnerabilities (age, disability) causing harm
- [ ] Social scoring by public authorities (discriminatory treatment)
- [ ] Real-time biometric identification in public spaces by law enforcement (narrow exceptions)

**HIGH-RISK** (Strict Requirements):
- [ ] **Biometrics**: Remote biometric identification, biometric categorization (race, politics, sexual orientation, etc.)
- [ ] **Critical Infrastructure**: Road traffic, water, gas, electricity management
- [ ] **Education**: Admissions, exam monitoring, grading
- [ ] **Employment**: CV screening, hiring, promotion, termination, task allocation, monitoring
- [ ] **Essential Services**: Credit scoring, insurance pricing, emergency dispatch
- [ ] **Law Enforcement**: Polygraph, evidence assessment, crime risk assessment, profiling
- [ ] **Migration/Asylum**: Risk assessment, application examination
- [ ] **Justice**: Assisting judicial authorities

**LIMITED-RISK** (Transparency Obligations):
- [ ] **Chatbots**: Inform users they're interacting with AI
- [ ] **Emotion Recognition / Biometric Categorization**: Inform individuals exposed
- [ ] **Deepfakes**: Label AI-generated/manipulated content

**MINIMAL-RISK** (No Obligations):
- [ ] Spam filters, video games, inventory management, etc.

---

## Code Snippets

### Bias Detection (Python)

```python
# Install: pip install aif360
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric
import pandas as pd

# Load your data
df = pd.read_csv('data.csv')

# Create AIF360 dataset
dataset = BinaryLabelDataset(
    df=df,
    label_names=['outcome'],
    protected_attribute_names=['gender', 'race'],
    favorable_label=1,
    unfavorable_label=0
)

# Calculate fairness metrics
metric = BinaryLabelDatasetMetric(
    dataset,
    unprivileged_groups=[{'gender': 0}],  # e.g., female
    privileged_groups=[{'gender': 1}]      # e.g., male
)

print(f"Disparate Impact: {metric.disparate_impact():.2f}")
print(f"Statistical Parity Difference: {metric.statistical_parity_difference():.4f}")

# Acceptable if DI between 0.80-1.20 and SPD < 0.10
```

---

### Explainability with SHAP (Python)

```python
# Install: pip install shap
import shap
import xgboost as xgb

# Train model
model = xgb.XGBClassifier()
model.fit(X_train, y_train)

# Explain predictions
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Visualize explanation for one prediction
shap.force_plot(explainer.expected_value, shap_values[0], X_test.iloc[0])

# Feature importance (global)
shap.summary_plot(shap_values, X_test)
```

---

### Adversarial Testing (Python)

```python
# Install: pip install adversarial-robustness-toolbox
from art.attacks.evasion import FastGradientMethod
from art.estimators.classification import SklearnClassifier
from sklearn.ensemble import RandomForestClassifier

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Wrap with ART
classifier = SklearnClassifier(model=model)

# Generate adversarial examples (FGSM attack)
attack = FastGradientMethod(estimator=classifier, eps=0.1)
X_adv = attack.generate(x=X_test[:100])

# Evaluate robustness
accuracy_clean = classifier._model.score(X_test[:100], y_test[:100])
accuracy_adv = classifier._model.score(X_adv, y_test[:100])

print(f"Clean Accuracy: {accuracy_clean:.2%}")
print(f"Adversarial Accuracy: {accuracy_adv:.2%}")
print(f"Accuracy Drop: {accuracy_clean - accuracy_adv:.2%}")
```

---

### Differential Privacy (Python)

```python
# Install: pip install opacus (PyTorch)
import torch
from opacus import PrivacyEngine

# Standard PyTorch model and optimizer
model = MyModel()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
data_loader = torch.utils.data.DataLoader(dataset, batch_size=64)

# Attach PrivacyEngine
privacy_engine = PrivacyEngine()
model, optimizer, data_loader = privacy_engine.make_private(
    module=model,
    optimizer=optimizer,
    data_loader=data_loader,
    noise_multiplier=1.0,  # Noise level
    max_grad_norm=1.0      # Gradient clipping
)

# Train as usual
for epoch in range(10):
    for data, target in data_loader:
        optimizer.zero_grad()
        output = model(data)
        loss = loss_fn(output, target)
        loss.backward()
        optimizer.step()
    
    # Check privacy spent
    epsilon = privacy_engine.get_epsilon(delta=1e-5)
    print(f"Epoch {epoch}, ε = {epsilon:.2f}")
```

---

## Tool Selection Guide

### Fairness Libraries

| Tool | Best For | Framework | License |
|------|----------|-----------|---------|
| **AIF360** | Comprehensive bias testing (70+ metrics, 10+ mitigations) | Scikit-learn, TensorFlow, PyTorch | Apache 2.0 |
| **Fairlearn** | Scikit-learn integration, threshold optimization | Scikit-learn | MIT |
| **What-If Tool** | Interactive visual exploration | TensorFlow | Apache 2.0 |

**Recommendation**: AIF360 for comprehensive testing, Fairlearn for sklearn pipelines.

---

### Explainability Libraries

| Tool | Best For | Model Support | License |
|------|----------|---------------|---------|
| **SHAP** | Most use cases (gold standard) | Any model | MIT |
| **LIME** | Quick individual explanations | Any model | BSD |
| **InterpretML** | Inherently interpretable models (EBM) | Glass-box models | MIT |
| **Captum** | Deep learning (PyTorch) | PyTorch | BSD |

**Recommendation**: SHAP for most use cases, InterpretML for interpretable-by-design.

---

### Security Libraries

| Tool | Best For | Framework | License |
|------|----------|-----------|---------|
| **ART** | Comprehensive (attacks + defenses) | TensorFlow, PyTorch, sklearn, XGBoost | MIT |
| **CleverHans** | Education, research | TensorFlow, PyTorch, JAX | MIT |
| **Foolbox** | Model-agnostic testing | Any model | MIT |

**Recommendation**: ART for production testing (most comprehensive).

---

### Privacy Libraries

| Tool | Best For | Framework | License |
|------|----------|-----------|---------|
| **Opacus** | Differential privacy (PyTorch) | PyTorch | Apache 2.0 |
| **TF Privacy** | Differential privacy (TensorFlow) | TensorFlow | Apache 2.0 |
| **PySyft** | Federated learning (experimental) | PyTorch | Apache 2.0 |

**Recommendation**: Opacus (PyTorch) or TF Privacy (TensorFlow) for differential privacy.

---

## Emergency Response

### 🚨 AI Incident Response (Quick Actions)

**If you discover bias, security breach, or compliance violation**:

**Immediate (0-2 hours)**:
1. **Assess Severity**: Critical (legal/significant harm) / High / Medium / Low
2. **Contain**: If critical, pause AI system or revert to human process
3. **Notify**: Alert AI Governance Manager, Legal, Information Security (depending on incident type)
4. **Document**: Start incident log (date, time, description, actions taken)

**Short-Term (2-24 hours)**:
1. **Investigate**: Root cause analysis (data issue? Model issue? Deployment error?)
2. **Triage**: Identify affected individuals, assess impact
3. **Regulatory Notification** (if required):
   - GDPR data breach: Notify supervisory authority within 72 hours
   - EU AI Act serious incident: Notify market surveillance authority
4. **Stakeholder Communication**: Notify affected individuals if required

**Medium-Term (1-7 days)**:
1. **Remediate**: Fix root cause (retrain model, patch vulnerability, update data)
2. **Compensate** (if needed): Provide remedy to affected individuals (manual review, reverse decision, compensation)
3. **Re-test**: Verify issue is resolved (fairness metrics, security testing, compliance check)
4. **Re-deploy**: Deploy fix with monitoring

**Long-Term (1-4 weeks)**:
1. **Post-Incident Review**: Lessons learned, preventive measures
2. **Update Processes**: Update policies, training, monitoring to prevent recurrence
3. **Communication**: Internal (share lessons) and external (transparency report) if appropriate

---

### Bias Incident Response

**Symptom**: Discriminatory outcomes detected (complaints, audit finding, media report)

**Actions**:
1. Pause system if decisions have legal/significant effects
2. Analyze: Run fairness metrics (disparate impact, demographic parity, etc.)
3. Investigate: Data bias? Algorithmic bias? Labeling bias?
4. Mitigate: Apply bias mitigation techniques (reweighting, adversarial debiasing, threshold optimization)
5. Re-test: Verify fairness metrics now acceptable
6. Affected Individuals: Offer manual review, overturn biased decisions if appropriate
7. Document: Update model card, audit report
8. Prevent: Enhance bias testing process, training for developers

---

### Security Incident Response

**Symptom**: Adversarial attack detected (model behaving unexpectedly, suspicious queries)

**Actions**:
1. Isolate: Temporarily restrict access or increase rate limits
2. Analyze: Identify attack type (evasion? poisoning? model extraction?)
3. Investigate: How did attacker bypass defenses?
4. Mitigate:
   - Evasion: Implement input validation, adversarial training
   - Poisoning: Clean training data, retrain
   - Extraction: Rate limiting, query monitoring, watermarking
5. Re-test: Verify defenses effective (red team testing)
6. Monitor: Enhanced monitoring for similar attacks
7. Document: Update security assessment, incident log
8. Prevent: Update security testing procedures, threat model

---

### Privacy Incident Response

**Symptom**: Data breach, privacy attack successful (membership inference, model inversion)

**Actions**:
1. Contain: Stop data exfiltration if ongoing
2. Assess: What data was compromised? How many individuals?
3. Notify: GDPR requires notification to supervisory authority within 72 hours if risk to individuals' rights
4. Investigate: How did breach occur? Vulnerability? Insider threat?
5. Mitigate: Apply differential privacy, enhance access controls, encrypt data
6. Affected Individuals: Notify if high risk (GDPR Article 34)
7. Document: Data breach log, DPO report
8. Prevent: Privacy impact assessment, enhanced security, training

---

## Additional Resources

### Regulatory Bodies

- **EU**: [EDPB (European Data Protection Board)](https://edpb.europa.eu) - GDPR guidance
- **EU**: [AI Act Portal](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) - EU AI Act information
- **U.S.**: [FTC AI Guidance](https://www.ftc.gov/business-guidance/blog/topics/artificial-intelligence) - U.S. regulatory guidance
- **U.S.**: [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) - AI Risk Management Framework

### Standards Bodies

- **ISO**: [ISO/IEC 42001](https://www.iso.org/standard/81230.html) - AI Management Systems
- **IEEE**: [IEEE Standards Association - AI/Ethics](https://standards.ieee.org/initiatives/artificial-intelligence-systems/)
- **OECD**: [OECD AI Principles](https://oecd.ai/en/ai-principles)

### Open-Source Tools

- **Fairness**: [AIF360](https://aif360.mybluemix.net/), [Fairlearn](https://fairlearn.org/)
- **Explainability**: [SHAP](https://shap.readthedocs.io/), [LIME](https://github.com/marcotcr/lime), [InterpretML](https://interpret.ml/)
- **Security**: [ART (Adversarial Robustness Toolbox)](https://adversarial-robustness-toolbox.org/)
- **Privacy**: [Opacus](https://opacus.ai/), [TensorFlow Privacy](https://github.com/tensorflow/privacy)

### Communities

- **Partnership on AI**: [partnershiponai.org](https://partnershiponai.org)
- **AI Ethics Lab**: [aiethicslab.com](https://aiethicslab.com)
- **FAccT (ACM Conference on Fairness, Accountability, and Transparency)**: [facctconference.org](https://facctconference.org)

---

## 📞 Need Help?

**Technical Support**: support@abir-ai.com  
**Governance Questions**: governance@abir-ai.com  
**Emergency Incident Support**: incidents@abir-ai.com (24/7 for premium members)

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Part of**: AI Governance & Responsible AI Foundations Certification

**© 2025 Abir AI. All rights reserved.**
