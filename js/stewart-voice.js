/**
 * Stewart Voice Widget - Embeddable Component
 * Add this script to any page to enable the voice trial widget
 * 
 * Usage:
 * <script src="https://meetstewart.github.io/voice/embed.js"></script>
 * <div id="stewart-voice-widget"></div>
 * 
 * Or with options:
 * StewartVoice.init({ 
 *   container: '#my-container',
 *   apiEndpoint: 'https://ai.casaxai.com',
 *   agentId: 'agent_stewart_demo'
 * });
 */

(function() {
    'use strict';
    
    // Default configuration
    const DEFAULT_CONFIG = {
        container: '#stewart-voice-widget',
        apiEndpoint: 'https://ai.casaxai.com',
        agentId: 'agent_stewart_demo',
        trialDuration: 10 * 60 * 1000, // 10 minutes
        fingerprintKey: 'stewart_trial_fp',
        theme: 'dark'
    };
    
    // CSS Styles
    const WIDGET_STYLES = `
        .stw-widget { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --stw-primary: #7C3AED;
            --stw-secondary: #06B6D4;
            --stw-dark: #0F172A;
            --stw-darker: #020617;
            --stw-light: #F8FAFC;
            --stw-gray: #64748B;
            --stw-success: #10B981;
            --stw-warning: #F59E0B;
            --stw-danger: #EF4444;
        }
        
        .stw-widget * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .stw-container {
            width: 100%;
            max-width: 420px;
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.98));
            border-radius: 24px;
            border: 1px solid rgba(124, 58, 237, 0.3);
            box-shadow: 0 25px 80px rgba(124, 58, 237, 0.15);
            overflow: hidden;
            position: relative;
        }
        
        .stw-header {
            padding: 1.5rem;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .stw-header h2 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--stw-light);
            margin-bottom: 0.25rem;
        }
        
        .stw-header p {
            color: var(--stw-gray);
            font-size: 0.875rem;
        }
        
        .stw-timer {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid rgba(245, 158, 11, 0.3);
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            margin-top: 1rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--stw-warning);
        }
        
        .stw-timer.low {
            background: rgba(239, 68, 68, 0.15);
            border-color: rgba(239, 68, 68, 0.3);
            color: var(--stw-danger);
            animation: stw-pulse 1s ease-in-out infinite;
        }
        
        @keyframes stw-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
        
        .stw-content { padding: 2rem; }
        
        .stw-form { display: flex; flex-direction: column; gap: 1rem; }
        .stw-form.hidden { display: none; }
        
        .stw-field { display: flex; flex-direction: column; gap: 0.5rem; }
        
        .stw-field label {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--stw-gray);
        }
        
        .stw-field input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.875rem 1rem;
            font-size: 1rem;
            color: var(--stw-light);
            outline: none;
            transition: all 0.3s;
        }
        
        .stw-field input:focus {
            border-color: var(--stw-primary);
            background: rgba(124, 58, 237, 0.05);
        }
        
        .stw-field input::placeholder { color: var(--stw-gray); }
        
        .stw-phone-group { display: flex; gap: 0.5rem; }
        .stw-phone-group .stw-country { width: 70px; text-align: center; }
        .stw-phone-group .stw-number { flex: 1; }
        
        .stw-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            border: none;
            width: 100%;
            transition: all 0.3s;
        }
        
        .stw-btn-primary {
            background: linear-gradient(135deg, var(--stw-primary), var(--stw-secondary));
            color: white;
        }
        
        .stw-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 40px rgba(124, 58, 237, 0.3);
        }
        
        .stw-btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        .stw-error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: var(--stw-danger);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            display: none;
        }
        
        .stw-error.active { display: block; }
        
        .stw-terms {
            text-align: center;
            font-size: 0.75rem;
            color: var(--stw-gray);
            margin-top: 0.5rem;
        }
        
        .stw-terms a { color: var(--stw-primary); text-decoration: none; }
        .stw-terms a:hover { text-decoration: underline; }
        
        /* SMS Verification */
        .stw-sms { display: none; text-align: center; }
        .stw-sms.active { display: block; }
        
        .stw-sms h3 {
            color: var(--stw-light);
            margin-bottom: 0.5rem;
        }
        
        .stw-sms p {
            color: var(--stw-gray);
            font-size: 0.875rem;
            margin-bottom: 1rem;
        }
        
        .stw-code-inputs {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin: 1.5rem 0;
        }
        
        .stw-code-inputs input {
            width: 48px;
            height: 56px;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: var(--stw-light);
            outline: none;
        }
        
        .stw-code-inputs input:focus { border-color: var(--stw-primary); }
        
        .stw-links { margin-top: 1rem; }
        .stw-links a {
            color: var(--stw-primary);
            text-decoration: none;
            font-size: 0.875rem;
        }
        .stw-links a:hover { text-decoration: underline; }
        .stw-links span { color: var(--stw-gray); }
        
        /* Voice Interface */
        .stw-voice { display: none; text-align: center; }
        .stw-voice.active { display: block; }
        
        .stw-orb {
            width: 160px;
            height: 160px;
            margin: 0 auto 2rem;
            position: relative;
            cursor: pointer;
        }
        
        .stw-orb-core {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, var(--stw-primary), var(--stw-secondary));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        
        .stw-orb-core svg {
            width: 40px;
            height: 40px;
            fill: white;
        }
        
        .stw-orb:hover .stw-orb-core {
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 0 40px rgba(124, 58, 237, 0.5);
        }
        
        .stw-orb.active .stw-orb-core {
            animation: stw-orb-pulse 1.5s ease-in-out infinite;
        }
        
        .stw-orb.speaking .stw-orb-core {
            animation: stw-orb-speak 0.3s ease-in-out infinite alternate;
        }
        
        @keyframes stw-orb-pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
            50% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 60px rgba(124, 58, 237, 0.6); }
        }
        
        @keyframes stw-orb-speak {
            from { transform: translate(-50%, -50%) scale(1); }
            to { transform: translate(-50%, -50%) scale(1.15); }
        }
        
        .stw-orb-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 2px solid rgba(124, 58, 237, 0.3);
            border-radius: 50%;
            opacity: 0;
        }
        
        .stw-orb.active .stw-orb-ring {
            animation: stw-ring-expand 2s ease-out infinite;
        }
        
        .stw-orb-ring:nth-child(2) { animation-delay: 0.5s; }
        .stw-orb-ring:nth-child(3) { animation-delay: 1s; }
        
        @keyframes stw-ring-expand {
            0% { width: 100px; height: 100px; opacity: 0.6; }
            100% { width: 200px; height: 200px; opacity: 0; }
        }
        
        .stw-status {
            font-size: 0.875rem;
            color: var(--stw-gray);
            margin-bottom: 1.5rem;
        }
        
        .stw-status.listening { color: var(--stw-success); }
        .stw-status.speaking { color: var(--stw-primary); }
        
        .stw-transcript {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            padding: 1rem;
            max-height: 150px;
            overflow-y: auto;
            margin-bottom: 1rem;
            font-size: 0.875rem;
            text-align: left;
        }
        
        .stw-transcript-line {
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            color: var(--stw-light);
        }
        
        .stw-transcript-line:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .stw-transcript-line.user { color: var(--stw-secondary); }
        .stw-transcript-line span { color: var(--stw-gray); font-size: 0.75rem; }
        
        .stw-btn-end {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: var(--stw-danger);
            display: none;
        }
        
        .stw-btn-end:hover { background: rgba(239, 68, 68, 0.25); }
        
        /* Trial Ended */
        .stw-ended { display: none; text-align: center; padding: 1rem; }
        .stw-ended.active { display: block; }
        .stw-ended h3 { color: var(--stw-light); font-size: 1.5rem; margin-bottom: 1rem; }
        .stw-ended p { color: var(--stw-gray); margin-bottom: 1.5rem; }
        
        .stw-btn-secondary {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--stw-light);
            margin-top: 0.75rem;
        }
        
        .stw-btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }
        
        .stw-footer {
            padding: 1rem 1.5rem;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.75rem;
            color: var(--stw-gray);
        }
        
        .stw-footer a { color: var(--stw-primary); text-decoration: none; }
        .stw-footer a:hover { text-decoration: underline; }
        
        .stw-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: stw-spin 0.8s linear infinite;
        }
        
        @keyframes stw-spin { to { transform: rotate(360deg); } }
    `;
    
    // HTML Template
    const WIDGET_HTML = `
        <div class="stw-container">
            <div class="stw-header">
                <h2>☆ Talk to Stewart</h2>
                <p>Your AI Executive Assistant</p>
                <div class="stw-timer" style="display: none;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span class="stw-timer-display">10:00</span> remaining
                </div>
            </div>
            
            <div class="stw-content">
                <div class="stw-form">
                    <div class="stw-error"></div>
                    <div class="stw-field">
                        <label>Your Name</label>
                        <input type="text" class="stw-name" placeholder="John Smith">
                    </div>
                    <div class="stw-field">
                        <label>Email Address</label>
                        <input type="email" class="stw-email" placeholder="john@company.com">
                    </div>
                    <div class="stw-field">
                        <label>Phone Number</label>
                        <div class="stw-phone-group">
                            <input type="text" class="stw-country" value="+1" readonly>
                            <input type="tel" class="stw-number" placeholder="(555) 123-4567">
                        </div>
                    </div>
                    <button class="stw-btn stw-btn-primary stw-send-btn">Send Verification Code</button>
                    <p class="stw-terms">
                        By continuing, you agree to our <a href="/sms/" target="_blank">Terms</a> 
                        and <a href="/sms/#privacy" target="_blank">Privacy Policy</a>
                    </p>
                </div>
                
                <div class="stw-sms">
                    <h3>Enter Verification Code</h3>
                    <p>We sent a 6-digit code to <span class="stw-masked-phone"></span></p>
                    <div class="stw-error stw-sms-error"></div>
                    <div class="stw-code-inputs">
                        <input type="text" maxlength="1" data-idx="0">
                        <input type="text" maxlength="1" data-idx="1">
                        <input type="text" maxlength="1" data-idx="2">
                        <input type="text" maxlength="1" data-idx="3">
                        <input type="text" maxlength="1" data-idx="4">
                        <input type="text" maxlength="1" data-idx="5">
                    </div>
                    <button class="stw-btn stw-btn-primary stw-verify-btn" disabled>Verify & Start Talking</button>
                    <div class="stw-links">
                        <a href="#" class="stw-resend">Resend code</a>
                        <span> · </span>
                        <a href="#" class="stw-back">Change number</a>
                    </div>
                </div>
                
                <div class="stw-voice">
                    <div class="stw-orb">
                        <div class="stw-orb-ring"></div>
                        <div class="stw-orb-ring"></div>
                        <div class="stw-orb-ring"></div>
                        <div class="stw-orb-core">
                            <svg class="stw-mic-icon" viewBox="0 0 24 24">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                <line x1="12" y1="19" x2="12" y2="23"/>
                                <line x1="8" y1="23" x2="16" y2="23"/>
                            </svg>
                            <svg class="stw-stop-icon" viewBox="0 0 24 24" style="display:none;">
                                <rect x="6" y="6" width="12" height="12" rx="2"/>
                            </svg>
                        </div>
                    </div>
                    <p class="stw-status">Click to start talking</p>
                    <div class="stw-transcript">
                        <div class="stw-transcript-line stewart">
                            <span>Stewart:</span> Hi! I'm Stewart, your AI executive assistant. How can I help you today?
                        </div>
                    </div>
                    <button class="stw-btn stw-btn-end">End Conversation</button>
                </div>
                
                <div class="stw-ended">
                    <h3>Trial Complete! 🎉</h3>
                    <p>Ready for the full power of your own AI executive assistant?</p>
                    <button class="stw-btn stw-btn-primary stw-cta-trial">Start 14-Day Free Trial</button>
                    <button class="stw-btn stw-btn-secondary stw-cta-demo">Watch Full Demo</button>
                </div>
            </div>
            
            <div class="stw-footer">
                Powered by <a href="https://meetstewart.com" target="_blank">Stewart</a> · 
                <a href="/sms/" target="_blank">Privacy</a> · 
                <a href="/sms/#terms" target="_blank">Terms</a>
            </div>
        </div>
    `;
    
    class StewartVoiceWidget {
        constructor(options = {}) {
            this.config = { ...DEFAULT_CONFIG, ...options };
            this.userData = {};
            this.verificationCode = '';
            this.trialTimer = null;
            this.retellClient = null;
            this.isCallActive = false;
            this.container = null;
        }
        
        init() {
            // Inject styles
            if (!document.getElementById('stw-styles')) {
                const style = document.createElement('style');
                style.id = 'stw-styles';
                style.textContent = WIDGET_STYLES;
                document.head.appendChild(style);
            }
            
            // Load Inter font
            if (!document.querySelector('link[href*="Inter"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
                document.head.appendChild(link);
            }
            
            // Find container
            this.container = document.querySelector(this.config.container);
            if (!this.container) {
                console.error('Stewart Voice Widget: Container not found');
                return;
            }
            
            // Inject HTML
            this.container.className = 'stw-widget';
            this.container.innerHTML = WIDGET_HTML;
            
            // Bind events
            this.bindEvents();
            
            // Check trial status
            this.checkTrialStatus();
        }
        
        bindEvents() {
            const $ = (sel) => this.container.querySelector(sel);
            const $$ = (sel) => this.container.querySelectorAll(sel);
            
            // Send code button
            $('.stw-send-btn').addEventListener('click', () => this.sendCode());
            
            // Code inputs
            $$('.stw-code-inputs input').forEach(input => {
                input.addEventListener('input', (e) => this.handleCodeInput(e.target));
            });
            
            // Verify button
            $('.stw-verify-btn').addEventListener('click', () => this.verifyCode());
            
            // Resend/back links
            $('.stw-resend').addEventListener('click', (e) => { e.preventDefault(); this.resendCode(); });
            $('.stw-back').addEventListener('click', (e) => { e.preventDefault(); this.goBack(); });
            
            // Phone formatting
            $('.stw-number').addEventListener('input', (e) => this.formatPhone(e.target));
            
            // Voice orb
            $('.stw-orb').addEventListener('click', () => this.toggleVoice());
            
            // End call
            $('.stw-btn-end').addEventListener('click', () => this.endCall());
            
            // CTAs
            $('.stw-cta-trial').addEventListener('click', () => window.location.href = '/#pricing');
            $('.stw-cta-demo').addEventListener('click', () => window.location.href = '/#demo');
        }
        
        getFingerprint() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('Stewart', 2, 2);
            const dataUrl = canvas.toDataURL();
            
            const components = [
                navigator.userAgent,
                navigator.language,
                screen.width + 'x' + screen.height,
                new Date().getTimezoneOffset(),
                dataUrl.slice(-50)
            ];
            
            return btoa(components.join('|')).slice(0, 32);
        }
        
        checkTrialStatus() {
            const fp = this.getFingerprint();
            const stored = localStorage.getItem(this.config.fingerprintKey);
            
            if (stored) {
                const data = JSON.parse(stored);
                if (data.fp === fp && data.used) {
                    this.showTrialEnded();
                    return false;
                }
                if (data.fp === fp && data.remaining) {
                    return data.remaining;
                }
            }
            
            return this.config.trialDuration;
        }
        
        saveTrialStatus(remaining) {
            const fp = this.getFingerprint();
            localStorage.setItem(this.config.fingerprintKey, JSON.stringify({
                fp: fp,
                remaining: remaining,
                used: remaining <= 0,
                timestamp: Date.now()
            }));
        }
        
        async sendCode() {
            const $ = (sel) => this.container.querySelector(sel);
            
            const name = $('.stw-name').value.trim();
            const email = $('.stw-email').value.trim();
            const phone = $('.stw-number').value.trim();
            
            if (!name || !email || !phone) {
                this.showError('.stw-error', 'Please fill in all fields');
                return;
            }
            
            if (!email.includes('@')) {
                this.showError('.stw-error', 'Please enter a valid email');
                return;
            }
            
            const cleanPhone = phone.replace(/\D/g, '');
            if (cleanPhone.length < 10) {
                this.showError('.stw-error', 'Please enter a valid phone number');
                return;
            }
            
            this.userData = { name, email, phone: '+1' + cleanPhone };
            
            const btn = $('.stw-send-btn');
            btn.innerHTML = '<div class="stw-spinner"></div> Sending...';
            btn.disabled = true;
            
            try {
                await this.delay(1000);
                this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
                console.log('Demo code:', this.verificationCode);
                
                $('.stw-form').classList.add('hidden');
                $('.stw-sms').classList.add('active');
                $('.stw-masked-phone').textContent = this.maskPhone(phone);
                $('.stw-code-inputs input').focus();
                
            } catch (error) {
                this.showError('.stw-error', 'Failed to send code');
                btn.innerHTML = 'Send Verification Code';
                btn.disabled = false;
            }
        }
        
        handleCodeInput(input) {
            const idx = parseInt(input.dataset.idx);
            if (input.value && idx < 5) {
                const next = this.container.querySelector(`.stw-code-inputs input[data-idx="${idx + 1}"]`);
                if (next) next.focus();
            }
            
            const inputs = this.container.querySelectorAll('.stw-code-inputs input');
            const code = Array.from(inputs).map(i => i.value).join('');
            this.container.querySelector('.stw-verify-btn').disabled = code.length !== 6;
        }
        
        async verifyCode() {
            const inputs = this.container.querySelectorAll('.stw-code-inputs input');
            const code = Array.from(inputs).map(i => i.value).join('');
            
            const btn = this.container.querySelector('.stw-verify-btn');
            btn.innerHTML = '<div class="stw-spinner"></div> Verifying...';
            btn.disabled = true;
            
            try {
                await this.delay(1000);
                
                if (code.length === 6) {
                    await this.registerUser();
                    this.startVoiceTrial();
                } else {
                    throw new Error('Invalid');
                }
            } catch (error) {
                this.showError('.stw-sms-error', 'Invalid verification code');
                btn.innerHTML = 'Verify & Start Talking';
                btn.disabled = false;
                inputs.forEach(i => i.value = '');
                inputs[0].focus();
            }
        }
        
        async registerUser() {
            try {
                await fetch(`${this.config.apiEndpoint}/api/trial-signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...this.userData,
                        fingerprint: this.getFingerprint(),
                        source: 'voice_trial'
                    })
                });
            } catch (e) {
                console.log('User registration (demo):', this.userData);
            }
        }
        
        startVoiceTrial() {
            const $ = (sel) => this.container.querySelector(sel);
            
            $('.stw-sms').classList.remove('active');
            $('.stw-voice').classList.add('active');
            $('.stw-timer').style.display = 'inline-flex';
            
            const remaining = this.checkTrialStatus();
            if (remaining === false) return;
            
            this.startTimer(remaining);
        }
        
        startTimer(duration) {
            let remaining = duration;
            this.updateTimerDisplay(remaining);
            
            this.trialTimer = setInterval(() => {
                remaining -= 1000;
                
                if (remaining <= 0) {
                    clearInterval(this.trialTimer);
                    this.endTrial();
                    return;
                }
                
                this.saveTrialStatus(remaining);
                this.updateTimerDisplay(remaining);
                
                if (remaining <= 2 * 60 * 1000) {
                    this.container.querySelector('.stw-timer').classList.add('low');
                }
            }, 1000);
        }
        
        updateTimerDisplay(ms) {
            const min = Math.floor(ms / 60000);
            const sec = Math.floor((ms % 60000) / 1000);
            this.container.querySelector('.stw-timer-display').textContent = 
                `${min}:${sec.toString().padStart(2, '0')}`;
        }
        
        async toggleVoice() {
            const $ = (sel) => this.container.querySelector(sel);
            const orb = $('.stw-orb');
            const status = $('.stw-status');
            
            if (!this.isCallActive) {
                orb.classList.add('active');
                status.textContent = 'Connecting...';
                status.className = 'stw-status';
                $('.stw-btn-end').style.display = 'block';
                
                try {
                    await this.startCall();
                    this.isCallActive = true;
                    status.textContent = 'Listening...';
                    status.className = 'stw-status listening';
                    $('.stw-mic-icon').style.display = 'none';
                    $('.stw-stop-icon').style.display = 'block';
                } catch (error) {
                    status.textContent = 'Click to retry';
                    orb.classList.remove('active');
                    $('.stw-btn-end').style.display = 'none';
                }
            }
        }
        
        async startCall() {
            // Demo mode simulation
            const orb = this.container.querySelector('.stw-orb');
            const status = this.container.querySelector('.stw-status');
            
            this.isCallActive = true;
            
            setTimeout(() => {
                orb.classList.add('speaking');
                status.textContent = 'Stewart is speaking...';
                status.className = 'stw-status speaking';
            }, 500);
            
            setTimeout(() => {
                orb.classList.remove('speaking');
                status.textContent = 'Listening...';
                status.className = 'stw-status listening';
                this.addTranscript('stewart', `Hi ${this.userData.name}! I can help with calendars, emails, team coordination, and more. What would you like help with?`);
            }, 3000);
        }
        
        addTranscript(role, text) {
            const transcript = this.container.querySelector('.stw-transcript');
            const line = document.createElement('div');
            line.className = `stw-transcript-line ${role}`;
            line.innerHTML = `<span>${role === 'user' ? 'You' : 'Stewart'}:</span> ${text}`;
            transcript.appendChild(line);
            transcript.scrollTop = transcript.scrollHeight;
        }
        
        endCall() {
            this.isCallActive = false;
            const $ = (sel) => this.container.querySelector(sel);
            const orb = $('.stw-orb');
            orb.classList.remove('active', 'speaking');
            $('.stw-status').textContent = 'Click to start talking';
            $('.stw-status').className = 'stw-status';
            $('.stw-btn-end').style.display = 'none';
            $('.stw-mic-icon').style.display = 'block';
            $('.stw-stop-icon').style.display = 'none';
        }
        
        endTrial() {
            this.endCall();
            this.saveTrialStatus(0);
            this.showTrialEnded();
        }
        
        showTrialEnded() {
            const $ = (sel) => this.container.querySelector(sel);
            $('.stw-form').classList.add('hidden');
            $('.stw-sms').classList.remove('active');
            $('.stw-voice').classList.remove('active');
            $('.stw-timer').style.display = 'none';
            $('.stw-ended').classList.add('active');
        }
        
        async resendCode() {
            const link = this.container.querySelector('.stw-resend');
            link.textContent = 'Sending...';
            await this.delay(1000);
            this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('New code:', this.verificationCode);
            link.textContent = 'Sent!';
            setTimeout(() => link.textContent = 'Resend code', 3000);
        }
        
        goBack() {
            const $ = (sel) => this.container.querySelector(sel);
            $('.stw-sms').classList.remove('active');
            $('.stw-form').classList.remove('hidden');
            const btn = $('.stw-send-btn');
            btn.innerHTML = 'Send Verification Code';
            btn.disabled = false;
        }
        
        showError(selector, msg) {
            const el = this.container.querySelector(selector);
            el.textContent = msg;
            el.classList.add('active');
            setTimeout(() => el.classList.remove('active'), 5000);
        }
        
        formatPhone(input) {
            let value = input.value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
            
            if (value.length >= 6) {
                input.value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
            } else if (value.length >= 3) {
                input.value = `(${value.slice(0,3)}) ${value.slice(3)}`;
            } else {
                input.value = value;
            }
        }
        
        maskPhone(phone) {
            const cleaned = phone.replace(/\D/g, '');
            return cleaned.length >= 10 ? `(***) ***-${cleaned.slice(-4)}` : '***-' + cleaned.slice(-4);
        }
        
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    
    // Global API
    window.StewartVoice = {
        init: function(options) {
            const widget = new StewartVoiceWidget(options);
            widget.init();
            return widget;
        }
    };
    
    // Auto-init if default container exists
    document.addEventListener('DOMContentLoaded', function() {
        if (document.querySelector('#stewart-voice-widget')) {
            window.StewartVoice.init();
        }
    });
})();
