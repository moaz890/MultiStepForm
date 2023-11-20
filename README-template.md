# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Links

- Solution URL: (https://github.com/moaz890/MultiStepForm)
- Live Site URL: (https://moaz890.github.io/MultiStepForm/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Vanilla JavaScript
- Swiper Library



### What I learned

- Using Some of Swiper library functions
```js
swiper.on('navigationNext', function(e) {
    // Add your custom condition here
    var activeSlideIndex = document.querySelector(".swiper-slide-active").dataset.step;
    switch (activeSlideIndex) {
        case "1":
            if (validateStepOneForm()){
                swiper.allowSlideNext = true;
                swiper.slideNext();
                controlStepsMap(activeSlideIndex);
                swiper.allowSlideNext = false;
            }
            break;
        case "2":
            swiper.allowSlideNext = true;
            swiper.slideNext();
            controlStepsMap(activeSlideIndex);
            swiper.allowSlideNext = false;
            break;
        case "3":
            let chosenPlans = document.querySelectorAll(".plans .input.active");
            if(chosenPlans.length > 0) {
                
                let summaryList = document.querySelector(".summary");
                let mainPlan = document.querySelector("ul.plans li.active");
                let controlBillingDataset = document.querySelector(".control-billing .control-billing-btn span").dataset.billing;
                
                summaryList.querySelector(".main-plan h3").textContent = mainPlan.querySelector("h3").textContent + ` (${controlBillingDataset.toUpperCase()})`;
                summaryList.querySelector(".main-plan .det-plan p").innerHTML = mainPlan.querySelector(".det-plan p").innerHTML;
                summaryList.querySelector(".services").innerHTML = "";
                chosenPlans.forEach((plan) => {
                    summaryList.querySelector(".services").appendChild(createSummaryItem(plan));
                });
                
                summaryList.parentElement.querySelector(".full-price p .total").textContent = Array.from(summaryList.querySelectorAll(".det-plan .total")).reduce((a, b) => a + +b.textContent, 0);

                swiper.allowSlideNext = true;
                swiper.slideNext();
                controlStepsMap(activeSlideIndex);
                swiper.allowSlideNext = false;
            }
            break;
        case "4":
            swiper.allowSlideNext = true;
            swiper.slideNext();
            swiper.allowSlideNext = false;
            break;

    }
});

swiper.on("navigationPrev", function (e) {

    var activeSlideIndex = document.querySelector(".swiper-slide-active").dataset.step;    
    controlStepsMap(+activeSlideIndex-1);

});

```
- Form Validation With REGEX
```js
function validateUsername(username) {
    
    // Add your username validation logic here
    if (username.value.length >= 3) {
        return true;
    } else {
        username.classList.add("error");
        return false;
    }
}

function validateEmail(email) {
  // Add your email validation logic here
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value)){
        return true;
    }else {
        email.classList.add("error");
        return false;
    }
}

function validatePhone(phone) {
  // Add your phone validation logic here
    var phoneRegex = /^\+?\d{1,3}?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if(phoneRegex.test(phone.value.trim())){
        return true
    }else {
        phone.classList.add("error");
        return false;
    }
}

```



### Continued development

- Using REGEX
- Using OOP & Objects
- Using APIs

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/moaz890)
- Twitter - [@yourusername](https://www.twitter.com/Prog_Abdelattey)


