import React from 'react';
import styles from '../style/newsletter.module.scss';

class NewsletterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subscribed: false,
      emailError: ''
    };
  }

  componentDidMount() {
    document.title = 'Coiso la';
  }

  handleEmailChange = (event) => {
    const email = event.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    this.setState({
      email: email,
      emailError: isValidEmail ? '' : 'Valid email required'
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValidEmail) {
      this.setState({ subscribed: true, emailError: '' });
    } else {
      this.setState({ emailError: 'Valid email required' });
    }
  };

  renderContent() {
    const { email, subscribed } = this.state;

    if (subscribed) {
      return (
        <>
          <div className={`${styles.subscribed} ${subscribed ? styles.show : ''}`}>
            <div>
              <img src="/icon-success.svg" alt="Confirmation icon" className={styles.subscribed__image} />
              <h2 className={styles.subscribed__title}>Thanks for subscribing!</h2>
              <p className={styles.subscribed__text}>
                A confirmation mail has been sent to <strong>{email}</strong>. Please open it and click the button inside
                to confirm your subscription.
              </p>
            </div>
            <button className={styles.subscribed__button} onClick={() => this.setState({ subscribed: false })}>
              Dismiss Message
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h2 className={styles.news__title}>Stay updated!</h2>
          <p className={styles.news__text}>Join 60,000+ product managers receiving monthly updates on:</p>
          <ul className={styles.news__list}>
            <li>
              <img src="/icon-list.svg" alt="Product discovery icon" />
              <p>Product discovery and building what matters</p>
            </li>
            <li>
              <img src="/icon-list.svg" alt="Measuring icon" />
              <p>Measuring to ensure updates are a success</p>
            </li>
            <li>
              <img src="/icon-list.svg" alt="More icon" />
              <p>And much more!</p>
            </li>
          </ul>
        </>
      );
    }
  }

  render() {
    const { email, subscribed, emailError } = this.state;

    return (
      <section className={`${styles.news__container} ${subscribed ? styles.expanded : ''}`}>
        <div className={styles.news__section}>
          <div className={styles.news__content}>
            {this.renderContent()}
          </div>
          {!subscribed && (
            <div className={styles.news__form_container}>
              <div className={styles.news__form_box}>
                <p className={styles.news__form_text}>Enter your email address:</p>
                {emailError && <p className={styles.news__form_error}>{emailError}</p>}
              </div>
              <form className={styles.news__form_form} onSubmit={this.handleSubmit}>
                <input
                  type="email"
                  className={`${styles.news__form_input} ${emailError ? styles.error : ''}`}
                  placeholder="email@company.com"
                  value={email}
                  onChange={this.handleEmailChange}
                  required
                />
                <button type="submit" className={styles.news__form_button}>
                  Subscribe to monthly newsletter
                </button>
              </form>
            </div>
          )}
        </div>
        {!subscribed && (
          <img src="./illustration-sign-up-desktop.svg" alt="Newsletter image" className={styles.news__image} />
        )}
        {!subscribed && (
          <img src="./illustration-sign-up-mobile.svg" alt="Newsletter image" className={styles.news__image_mobile} />
        )}
      </section>
    );
  }
}

export default NewsletterPage;
