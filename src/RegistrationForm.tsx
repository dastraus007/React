import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import './RegistrationForm.css';

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Account Security
  password: string;
  confirmPassword: string;
  
  // Preferences
  country: string;
  gender: string;
  interests: string[];
  newsletterSubscribe: boolean;
  
  // Additional
  bio: string;
  experienceLevel: number;
  preferredContactTime: string;
  
  // Terms
  agreeToTerms: boolean;
}

const STORAGE_KEY = 'registration_form_draft';

// Fields that should NOT be stored in localStorage
const SENSITIVE_FIELDS = ['password', 'confirmPassword'];

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isValid }
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
      country: '',
      gender: '',
      interests: [],
      newsletterSubscribe: false,
      bio: '',
      experienceLevel: 50,
      preferredContactTime: '',
      agreeToTerms: false,
    }
  });

  const password = watch('password');
  const allFormValues = watch();

  // Load cached data on mount
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsedData = JSON.parse(cached);
        // Restore non-sensitive fields
        Object.keys(parsedData).forEach((key) => {
          if (!SENSITIVE_FIELDS.includes(key)) {
            setValue(key as keyof FormData, parsedData[key]);
          }
        });
      } catch (error) {
        console.error('Failed to parse cached form data:', error);
      }
    }
  }, [setValue]);

  // Cache non-sensitive data to localStorage
  useEffect(() => {
    const dataToCache: Partial<FormData> = {};
    Object.keys(allFormValues).forEach((key) => {
      if (!SENSITIVE_FIELDS.includes(key)) {
        dataToCache[key as keyof FormData] = allFormValues[key as keyof FormData];
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToCache));
  }, [allFormValues]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log submitted data (excluding sensitive info in production)
    console.log('Form submitted successfully:', {
      ...data,
      password: '[REDACTED]',
      confirmPassword: '[REDACTED]'
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Clear localStorage after successful submission
    localStorage.removeItem(STORAGE_KEY);

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form" noValidate>
        <h1>Registration Form</h1>
        <p className="form-description">Please fill out all required fields to register.</p>

        {/* Personal Information Section */}
        <fieldset>
          <legend>Personal Information</legend>

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name <span className="required" aria-label="required">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Name can only contain letters and spaces'
                }
              })}
              aria-invalid={errors.fullName ? 'true' : 'false'}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <span id="fullName-error" className="error-message" role="alert">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required" aria-label="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="required" aria-label="required">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[\d\s\-\+\(\)]+$/,
                  message: 'Please enter a valid phone number'
                },
                minLength: {
                  value: 10,
                  message: 'Phone number must be at least 10 characters'
                }
              })}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <span id="phone-error" className="error-message" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dateOfBirth">
              Date of Birth <span className="required" aria-label="required">*</span>
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth', {
                required: 'Date of birth is required',
                validate: (value) => {
                  const age = new Date().getFullYear() - new Date(value).getFullYear();
                  return age >= 18 || 'You must be at least 18 years old';
                }
              })}
              aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
              aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
            />
            {errors.dateOfBirth && (
              <span id="dateOfBirth-error" className="error-message" role="alert">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Account Security Section */}
        <fieldset>
          <legend>Account Security</legend>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required" aria-label="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: 'Password must contain uppercase, lowercase, number, and special character'
                }
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error password-help' : 'password-help'}
            />
            <span id="password-help" className="help-text">
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </span>
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password <span className="required" aria-label="required">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match'
              })}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            />
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className="error-message" role="alert">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Preferences Section */}
        <fieldset>
          <legend>Preferences</legend>

          {/* Country Select */}
          <div className="form-group">
            <label htmlFor="country">
              Country <span className="required" aria-label="required">*</span>
            </label>
            <select
              id="country"
              {...register('country', {
                required: 'Please select a country'
              })}
              aria-invalid={errors.country ? 'true' : 'false'}
              aria-describedby={errors.country ? 'country-error' : undefined}
            >
              <option value="">Select a country...</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="jp">Japan</option>
              <option value="other">Other</option>
            </select>
            {errors.country && (
              <span id="country-error" className="error-message" role="alert">
                {errors.country.message}
              </span>
            )}
          </div>

          {/* Gender Radio Buttons */}
          <div className="form-group">
            <fieldset className="radio-group">
              <legend>
                Gender <span className="required" aria-label="required">*</span>
              </legend>
              <div className="radio-options">
                <div className="radio-option">
                  <input
                    id="gender-male"
                    type="radio"
                    value="male"
                    {...register('gender', {
                      required: 'Please select your gender'
                    })}
                  />
                  <label htmlFor="gender-male">Male</label>
                </div>
                <div className="radio-option">
                  <input
                    id="gender-female"
                    type="radio"
                    value="female"
                    {...register('gender')}
                  />
                  <label htmlFor="gender-female">Female</label>
                </div>
                <div className="radio-option">
                  <input
                    id="gender-other"
                    type="radio"
                    value="other"
                    {...register('gender')}
                  />
                  <label htmlFor="gender-other">Other</label>
                </div>
                <div className="radio-option">
                  <input
                    id="gender-prefer-not"
                    type="radio"
                    value="prefer-not"
                    {...register('gender')}
                  />
                  <label htmlFor="gender-prefer-not">Prefer not to say</label>
                </div>
              </div>
              {errors.gender && (
                <span className="error-message" role="alert">
                  {errors.gender.message}
                </span>
              )}
            </fieldset>
          </div>

          {/* Interests Checkboxes */}
          <div className="form-group">
            <fieldset className="checkbox-group">
              <legend>Interests (select at least one)</legend>
              <div className="checkbox-options">
                <div className="checkbox-option">
                  <input
                    id="interest-tech"
                    type="checkbox"
                    value="technology"
                    {...register('interests', {
                      validate: (value) =>
                        value.length > 0 || 'Please select at least one interest'
                    })}
                  />
                  <label htmlFor="interest-tech">Technology</label>
                </div>
                <div className="checkbox-option">
                  <input
                    id="interest-sports"
                    type="checkbox"
                    value="sports"
                    {...register('interests')}
                  />
                  <label htmlFor="interest-sports">Sports</label>
                </div>
                <div className="checkbox-option">
                  <input
                    id="interest-music"
                    type="checkbox"
                    value="music"
                    {...register('interests')}
                  />
                  <label htmlFor="interest-music">Music</label>
                </div>
                <div className="checkbox-option">
                  <input
                    id="interest-art"
                    type="checkbox"
                    value="art"
                    {...register('interests')}
                  />
                  <label htmlFor="interest-art">Art</label>
                </div>
                <div className="checkbox-option">
                  <input
                    id="interest-travel"
                    type="checkbox"
                    value="travel"
                    {...register('interests')}
                  />
                  <label htmlFor="interest-travel">Travel</label>
                </div>
              </div>
              {errors.interests && (
                <span className="error-message" role="alert">
                  {errors.interests.message}
                </span>
              )}
            </fieldset>
          </div>

          {/* Experience Level Range Slider */}
          <div className="form-group">
            <label htmlFor="experienceLevel">
              Experience Level: <output>{watch('experienceLevel')}%</output>
            </label>
            <Controller
              name="experienceLevel"
              control={control}
              render={({ field }) => (
                <input
                  id="experienceLevel"
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  {...field}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={field.value}
                />
              )}
            />
            <div className="range-labels">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          {/* Preferred Contact Time */}
          <div className="form-group">
            <label htmlFor="preferredContactTime">
              Preferred Contact Time
            </label>
            <input
              id="preferredContactTime"
              type="time"
              {...register('preferredContactTime')}
            />
          </div>

          {/* Bio Textarea */}
          <div className="form-group">
            <label htmlFor="bio">
              Tell us about yourself
            </label>
            <textarea
              id="bio"
              rows={4}
              {...register('bio', {
                maxLength: {
                  value: 500,
                  message: 'Bio must not exceed 500 characters'
                }
              })}
              aria-invalid={errors.bio ? 'true' : 'false'}
              aria-describedby={errors.bio ? 'bio-error bio-help' : 'bio-help'}
              placeholder="Share a bit about yourself..."
            />
            <span id="bio-help" className="help-text">
              Maximum 500 characters ({watch('bio')?.length || 0}/500)
            </span>
            {errors.bio && (
              <span id="bio-error" className="error-message" role="alert">
                {errors.bio.message}
              </span>
            )}
          </div>

          {/* Newsletter Checkbox */}
          <div className="form-group">
            <div className="checkbox-option">
              <input
                id="newsletterSubscribe"
                type="checkbox"
                {...register('newsletterSubscribe')}
              />
              <label htmlFor="newsletterSubscribe">
                Subscribe to our newsletter for updates and promotions
              </label>
            </div>
          </div>
        </fieldset>

        {/* Terms and Conditions */}
        <fieldset>
          <legend>Terms and Conditions</legend>
          <div className="form-group">
            <div className="checkbox-option">
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register('agreeToTerms', {
                  required: 'You must agree to the terms and conditions'
                })}
                aria-invalid={errors.agreeToTerms ? 'true' : 'false'}
                aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
              />
              <label htmlFor="agreeToTerms">
                I agree to the <a href="#terms" target="_blank">Terms and Conditions</a> and{' '}
                <a href="#privacy" target="_blank">Privacy Policy</a>{' '}
                <span className="required" aria-label="required">*</span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <span id="agreeToTerms-error" className="error-message" role="alert">
                {errors.agreeToTerms.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="submit-button"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="success-message" role="status" aria-live="polite">
            ✓ Registration successful! Check the console for submitted data.
          </div>
        )}
      </form>
    </div>
  );
}
