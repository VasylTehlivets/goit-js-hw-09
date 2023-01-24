import { Notify } from 'notiflix';

const form = document.querySelector('.form');
const nameDelay = document.querySelector('input[name="delay"]');
const nameStep = document.querySelector('input[name="step"]');
const nameAmount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(nameDelay.value);
  let step = Number(nameStep.value);
  let amount = Number(nameAmount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  let promiseValue = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(promiseValue);
    }
    reject(promiseValue);
  });
}
