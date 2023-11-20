var paidState = "";
var swiper = new Swiper(".swiper", {
    direction: "horizontal",
    slidesPerView: 1,
    noSwipingClass: 'swiper-no-swiping',
    allowSlideNext: false,
    breakpoints: {
        481: {
            spaceBetween: 55, 
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

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

var plansItems = document.querySelectorAll(".plans :where(li, .input)");

plansItems.forEach((plan) => {
    plan.addEventListener("click", function (e) {
        if (plan.tagName === "LI"){
            removeClassFromGroup(plansItems, "active");
            plan.classList.add("active");
        }else {
            plan.classList.toggle("active");
        }
        
    });
});

const billingButton = document.querySelector(".control-billing-btn");

billingButton.addEventListener("click", function (e) {
    var state = billingButton.querySelector("span");
    var cancelled = state.dataset.billing;
    if (state.dataset.billing === "monthly"){
        state.dataset.billing = "yearly";
        determinePlan("yearly");
    }else {
        state.dataset.billing = "monthly";
        determinePlan("monthly");
    }
    billingButton.parentElement.querySelector(`.${state.dataset.billing}`).classList.add("active");
    billingButton.parentElement.querySelector(`.${cancelled}`).classList.remove("active");
});



function validateStepOneForm () {
    document.querySelectorAll("#step-one-form input").forEach((input) => { 

        if (input.classList.contains("error")){
            input.classList.remove("error");
        }
    }); 
    var usernameInput = document.getElementById("inputUserName");
    var emailInput = document.getElementById("inputEmail");
    var phoneInput = document.getElementById("inputPhoneNumber");

    var isUsernameValid = validateUsername(usernameInput);
    var isEmailValid = validateEmail(emailInput);
    var isPhoneValid = validatePhone(phoneInput);


    if (isUsernameValid && isEmailValid && isPhoneValid) {
      return true; // Enable swiping to the next slide
    } else {
      return false; // Disable swiping to the next slide
    }

}


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

function controlStepsMap(nextSlideActiceIndex){

    document.querySelectorAll(".steps-links li").forEach((li) => li.classList.remove("active"));
    document.querySelector(`.steps-links li[data-index="${+nextSlideActiceIndex + 1}"]`).classList.add("active");

}

function removeClassFromGroup(group, className) {
    group.forEach((plan) => {
        plan.classList.remove(className);                
    });
}

function determinePlan(state) {
    document.querySelectorAll(".text.det-plan").forEach((plan) => {
        let total = plan.querySelector("p .total");
        let payState = plan.querySelector("p .state");
        
        if (state === "monthly") {

            total.textContent = +total.textContent / 10;
            payState.textContent = "mo";
            
        }else {
            total.textContent = +total.textContent * 10;
            payState.textContent = "yr";
        }
        
        if(total.parentElement.parentElement.querySelector("strong")){
            total.parentElement.parentElement.querySelector("strong").classList.toggle("hidden")
        }
    });
}

function createSummaryItem (plan) {
    let item = document.createElement("li");
    item.classList.add("flex", "service");
    item.innerHTML = 
    `
    <div class="service-name text-mini">${plan.querySelector(".text h3").textContent}</div>
    <div class="text det-plan">
        ${plan.querySelector(".text.det-plan").innerHTML}
    </div>
    `
    return item;
}

