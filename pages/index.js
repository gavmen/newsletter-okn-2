import React from 'react';
import styles from '../style/newsletter.module.scss';

class NewsletterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subscribed: false,
    };
  }

  componentDidMount() {
    document.title = 'Coiso la';
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary form submission logic, e.g., send data to backend

    // Simulating a successful subscription for demonstration purposes
    this.setState({ subscribed: true });
  };

  renderContent() {
    const { email, subscribed } = this.state;

    if (subscribed) {
      return (
        <>
        <div className={`${styles.subscribed} ${subscribed ? styles.show : ''}`}>
          <img src="/icon-success.svg" alt="Confirmation icon" className={styles.subscribed__image} />
          <h2 className={styles.subscribed__title}>Thanks for subscribing</h2>
          <p className={styles.subscribed__text}>
            A confirmation mail has been sent to <strong>{email}</strong>. Please open it and click the button inside
            to confirm your subscription.
          </p>
          <button className={styles.subscribed__button} onClick={() => this.setState({ subscribed: false })}>
            Return to newsletter
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
    const { email, subscribed } = this.state;

    return (
      <section className={`${styles.news__container} ${subscribed ? styles.expanded : ''}`}>
        <div className={styles.news__section}>
          <div className={styles.news__content}>
            {this.renderContent()}
          </div>
          {!subscribed && (
            <div className={styles.news__form_container}>
              <p className={styles.news__form_text}>Enter your email address:</p>
              <form className={styles.news__form_form} onSubmit={this.handleSubmit}>
                <input
                  type="email"
                  className={styles.news__form_input}
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
      </section>
    );
  }
}

export default NewsletterPage;
