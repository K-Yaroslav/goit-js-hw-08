import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const localStorageValues = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

function onFormSubmit(e) {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  if (email === '' || message === '') {
    alert('Please enter a valid email address!');
    return;
  }
  refs.form.reset();
  console.log({ email, message });
}

const onEmailInput = e => {
  localStorageValues.email = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageValues));
};

const onMessageInput = e => {
  localStorageValues.message = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageValues));
};

const saveInformation = () => {
  let savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    localStorageValues.email = savedMessage.email;
    localStorageValues.message = savedMessage.message;
    refs.email.value = localStorageValues.email;
    refs.textarea.value = localStorageValues.message;
  }
};

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.textarea.addEventListener('input', throttle(onMessageInput, 500));
saveInformation();
