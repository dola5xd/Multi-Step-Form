const stepCountainer = document.getElementById("stepInfo");
const stepsCount = document.querySelectorAll("#steps span");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");
// step 1
let nameValue;
let emailValue;
let phoneValue;

// step 2
let planDuration = "monthly";
let plan;
let plan_price;

// step 3
let addsArray = [];

function removeRepeatedElements(arr) {
    // Create a frequency map
    const frequencyMap = {};

    // Count the occurrences of each element
    arr.forEach((element) => {
        if (frequencyMap[element]) {
            frequencyMap[element]++;
        } else {
            frequencyMap[element] = 1;
        }
    });

    // Filter the array to include only elements that appear exactly once
    const filteredArray = arr.filter((element) => frequencyMap[element] === 1);

    return filteredArray;
}

const CheckForm = function() {
    if (stepsCount[0].classList.contains("active")) {
        const personalForm = document.forms[0];
        const Name = personalForm.querySelector("#name").value;
        const emailAddress = personalForm.querySelector("#email").value;
        const mobilePhone = personalForm.querySelector("#phone").value;

        //   Check Name
        if (Name.length >= 4) {
            personalForm.querySelector("#name").classList.contains("invalid") ?
                personalForm.querySelector("#name").classList.remove("invalid") :
                "";
            nameValue = Name;
        } else personalForm.querySelector("#name").classList.add("invalid");

        //   Check Email
        if (emailAddress.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) != null) {
            personalForm.querySelector("#email").classList.contains("invalid") ?
                personalForm.querySelector("#email").classList.remove("invalid") :
                "";
            emailValue = emailAddress;
        } else {
            personalForm.querySelector("#email").classList.add("invalid");
        }

        //   Check Phone
        if (
            mobilePhone.length ==
            personalForm.querySelector("#phone").getAttribute("maxlength") ||
            mobilePhone.length ==
            personalForm.querySelector("#phone").getAttribute("maxlength") - 1
        ) {
            personalForm.querySelector("#phone").classList.contains("invalid") ?
                personalForm.querySelector("#phone").classList.remove("invalid") :
                "";
            phoneValue = mobilePhone;
        } else personalForm.querySelector("#phone").classList.add("invalid");

        //   Make Changes!

        if (
            nameValue != undefined &&
            emailValue != undefined &&
            phoneValue != undefined
        ) {
            //Show BackBtn
            backBtn.classList.remove("hidden");

            //   change count
            stepsCount[0].classList.remove("active");
            stepsCount[1].classList.add("active");

            //   change content
            stepCountainer.querySelector("h1").textContent = "Select your plan";
            stepCountainer.querySelector("p").textContent =
                " You have the option of monthly or yearly billing.";
            personalForm.remove();

            const secoundStep = ` 
      <div class="box-container duration-500 flex">
<div class="plan">
  <span class="img">
    <img src="./assets/images/icon-arcade.svg" alt="arcade" />
  </span>
  <span class="info">
    <h1>Arcade</h1>
    <p>$9/mo</p>
  </span>
</div>
<div class="plan">
  <span class="img">
    <img src="./assets/images/icon-advanced.svg" alt="advanced" />
  </span>
  <span class="info">
    <h1>Advanced</h1>
    <p>$12/mo</p>
  </span>
</div>
<div class="plan">
  <span class="img">
    <img src="./assets/images/icon-pro.svg" alt="pro" />
  </span>
  <span class="info">
    <h1>Pro</h1>
    <p>$15/mo</p>
  </span>
</div>
</div>

<label
class="inline-flex check items-center cursor-pointer justify-center w-full p-[10px] mt-[5px] lg:my-[30px] rounded"
>
<input type="checkbox" value="" class="sr-only peer" />
<span
  class="mr-3 text-sm text-marine_Blue font-bold peer-checked:text-Cool_gray duration-500"
  >Monthly</span
>
<div
  class="relative w-11 h-6 rounded-full peer bg-marine_Blue peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:scale-[0.8] after:transition-all border-gray-600"
></div>
<span
  class="ms-3 text-sm font-bold text-Cool_gray peer-checked:text-marine_Blue duration-500"
>
  Yearly
</span>
</label>
`;
            stepCountainer.insertAdjacentHTML("beforeend", secoundStep);

            document.querySelectorAll(".box-container .plan").forEach((e) => {
                e.addEventListener("click", () => {
                    document
                        .querySelectorAll(".box-container .plan")
                        .forEach((e) => e.classList.remove("active"));
                    e.classList.toggle("active");
                    plan = e.querySelector("h1").textContent.trim();
                });
            });

            document.querySelector(".peer").addEventListener("click", () => {
                document.querySelector("label").classList.toggle("checked");

                const text = document.querySelectorAll(".box-container .plan .info");

                if (document.querySelector("label").classList.contains("checked")) {
                    const offer = `
          <span class="offer">2 months free!</span>
          `;
                    text[0].querySelector("p").textContent = "$90/yr";
                    text[1].querySelector("p").textContent = "$120/yr";
                    text[2].querySelector("p").textContent = "$150/yr";
                    text.forEach((e) => e.insertAdjacentHTML("beforeend", offer));
                    planDuration = "yearly";
                } else {
                    document
                        .querySelectorAll(".box-container .plan .info .offer")
                        .forEach((e) => e.remove());
                    text[0].querySelector("p").textContent = "$9/mo";
                    text[1].querySelector("p").textContent = "$12/mo";
                    text[2].querySelector("p").textContent = "$15/mo";
                    planDuration = "monthly";
                }
            });

            //   reload loader
            getLoader(stepCountainer);
        }
    } else if (stepsCount[1].classList.contains("active")) {
        if (document.querySelector(".plan.active") != null) {
            // save Plan info
            plan = document.querySelector(".plan.active .info h1").textContent;
            plan_price = document.querySelector(".plan.active .info p").textContent;

            //   change count
            stepsCount[1].classList.remove("active");
            stepsCount[2].classList.add("active");

            //   change content
            stepCountainer.querySelector("h1").textContent = "Pick add-ons";
            stepCountainer.querySelector("p").textContent =
                " Add-ons help enhance your gaming experience.";
            stepCountainer.querySelector(".box-container").remove();
            stepCountainer.querySelector("label").remove();
            const adds = `
                              <div class="adds hidden">
                        <div class="add-ons">
                            <span class="check">
                                <input type="checkbox" name="check" id="os" class="inline-block">
                                </span>
                            <span class="text">
                                <label for="os" class="m-0 leading-none">Online service</label>
                                <p class="m-0 leading-none">Access to multiplayer games</p>
                            </span>
                            <span class="price">${
                              planDuration == "monthly" ? "+$1/mo" : "+$10/yr"
                            }</span>
                        </div>
                        <div class="add-ons">
                            <span class="check">
                                <input type="checkbox" name="check" id="ls" class="inline-block">
                                </span>
                            <span class="text">
                                <label for="ls" class="m-0 leading-none">Larger storage</label>
                                <p class="m-0 leading-none">Extra 1TB of cloud save</p>
                            </span>
                            <span class="price">${
                              planDuration == "monthly" ? "+$2/mo" : "+$20/yr"
                            }</span>
                        </div>
                        <div class="add-ons">
                            <span class="check">
                                <input type="checkbox" name="check" id="cp" class="inline-block">
                                </span>
                            <span class="text">
                                <label for="cp" class="m-0 leading-none">Customizable Profile</label>
                                <p class="m-0 leading-none">Custom theme on your profile</p>
                            </span>
                            <span class="price">${
                              planDuration == "monthly" ? "+$2/mo" : "+$20/yr"
                            }</span>
                        </div>
                    </div>
          `;
            stepCountainer.insertAdjacentHTML("beforeend", adds);

            // Make active add-ons effects and save user adds
            document.querySelectorAll(".add-ons input").forEach((e) => {
                e.addEventListener("click", () => {
                    e.parentElement.parentElement.classList.toggle("checked");
                    let add = [];
                    let addName =
                        e.parentElement.parentElement.querySelector(
                            ".text label"
                        ).textContent;
                    let addPrice = e.parentElement.parentElement
                        .querySelector(".price")
                        .textContent.split("$")[1];

                    add.push(addName, addPrice);

                    addsArray.push(add);
                    addsArray = removeRepeatedElements(addsArray);
                });
            });
            // import loader
            getLoader(stepCountainer);
        } else addsArray.push(null);
    } else if (stepsCount[2].classList.contains("active")) {
        //   change count
        stepsCount[2].classList.remove("active");
        stepsCount[3].classList.add("active");

        //   change content
        stepCountainer.querySelector("h1").textContent = "Finishing up";
        stepCountainer.querySelector("p").textContent =
            "Double-check everything looks OK before confirming.";
        stepCountainer.querySelector(".adds").remove();

        let summaryEl = `
                        <section class="summary hidden">
                    <div class="sub">
                        <div class="plan">
                            <h1>
                                <span>${plan} (${planDuration})</span>
                                <button type="button" onClick="changePlan()">Change</button>
                            </h1>
                            <span class="font-bold text-marine_Blue">${plan_price}</span>
                        </div>
                        <div class="adds">
                        </div>
                    </div>
                    <div class="flex items-center justify-between total px-[20px]">
                        <h1 class="text-Cool_gray">Total (per ${
                          planDuration == "monthly" ? "month" : "year"
                        })</h1>
                        <span id="totalPrice" class="font-bold text-Purplish_Blue"></span>
                    </div>
                </section>
        `;
        stepCountainer.insertAdjacentHTML("beforeend", summaryEl);
        addsArray.forEach((e, i) => {
            let addEl = `
            <div class="flex justify-between add-${i + 1} ">
                <h1 class="text-Cool_gray">
                    ${e[0]}
                </h1>
                <span class="font-medium text-marine_Blue">$${e[1]}</span>
            </div>`;

            document.querySelector(".adds").insertAdjacentHTML("afterbegin", addEl);
        });

        if (planDuration == "monthly") {
            let totalAdds = 0;
            addsArray.forEach((e) => (totalAdds += Number(e[1].split("/mo")[0])));
            total = Number(plan_price.split("/mo")[0].split("$")[1]) + totalAdds;
            document.getElementById("totalPrice").textContent = `$${total}/mo`;
        } else {
            let totalAdds = 0;
            addsArray.forEach((e) => (totalAdds += Number(e[1].split("/yr")[0])));
            total = Number(plan_price.split("/yr")[0].split("$")[1]) + totalAdds;
            document.getElementById("totalPrice").textContent = `$${total}/yr`;
        }
        nextBtn.classList.replace("bg-marine_Blue", "bg-Purplish_Blue");
        nextBtn.textContent = "Confirm";
        getLoader(stepCountainer);
    } else if (
        stepsCount[3].classList.contains("active") &&
        nextBtn.textContent != "Confirm"
    ) {} else if (
        stepsCount[3].classList.contains("active") &&
        nextBtn.textContent == "Confirm"
    ) {
        document.querySelector(".summary").remove();
        stepCountainer.querySelector("h1").remove();
        stepCountainer.querySelector("p").remove();
        document.querySelector(".movements").remove();
        document
            .querySelector("section")
            .classList.replace("h-[90vh]", "h-[100vh]");

        const confirming = ` <div class="flex flex-col items-center">
            <span class="my-[20px]">
              <img
                src="./assets/images/icon-thank-you.svg"
                alt="thanks"
                class="scale-90"
              />
            </span>
            <h1 class="text-[2em] font-bold text-marine_Blue">Thank you!</h1>
            <p
              class="text-center text-Cool_gray mt-[10px] text-[13px] md:text-[18px] px-[10px]"
            >
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>`;
        stepCountainer.insertAdjacentHTML("beforeend", confirming);
        getLoader(stepCountainer);
    }
};

const getLoader = function(element) {
    const loader = `
    <div class="loader">
    <span class="animate-spin"></span>
  </div>
    `;
    element.insertAdjacentHTML("afterBegin", loader);
    element.classList.add("flex", "items-center", "justify-center");
    document.getElementById("stepInfo").childNodes.forEach(function(e) {
        if (e.classList != undefined) {
            e.classList.add("hidden");

            setTimeout(() => {
                e.classList.remove("hidden");
                if (document.querySelector(".adds") != null) {
                    document.querySelector(".adds").classList.remove("hidden");
                    document.querySelector(".adds").classList.add("flex");
                }
                if (document.querySelector(".summary") != null) {
                    document.querySelector(".summary").classList.remove("hidden");
                    document.querySelector(".summary").classList.add("flex");
                }
                element.classList.remove("flex", "items-center", "justify-center");
                document.querySelector(".loader") != null ?
                    document.querySelector(".loader").remove() :
                    "";
            }, 2000);
        }
    });
};

// Go back function
const back = function() {
    if (stepsCount[1].classList.contains("active")) {
        backBtn.classList.add("hidden");
        const form = `   
    <form action="post" class="flex flex-col my-[10px] duration-500">
                    <label for="name">Name</label>
                    <input type="text" id="name" placeholder="e.g. Stephen King" class="capitalize" />
                    <label for="email">E-mail Address</label>
                    <input type="email" id="email" placeholder="e.g. stephenking@lorem.com" />
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" maxlength="14" placeholder="e.g. +1 234 567 890" />
                </form>
        `;
        stepCountainer.insertAdjacentHTML("beforeend", form);
        const personalForm = document.forms[0];
        personalForm.querySelector("#name").value = nameValue;
        personalForm.querySelector("#email").value = emailValue;
        personalForm.querySelector("#phone").value = phoneValue;

        //   change count
        stepsCount[1].classList.remove("active");
        stepsCount[0].classList.add("active");

        //   change content
        stepCountainer.querySelector("h1").textContent = "Personal info";
        stepCountainer.querySelector("p").textContent =
            "Please provide your name, email address, and phone number.";
        document.querySelector(".box-container").remove();
        document.querySelector("label").remove();
        getLoader(stepCountainer);
    } else if (stepsCount[2].classList.contains("active")) {
        //   change count
        stepsCount[2].classList.remove("active");
        stepsCount[1].classList.add("active");
        addsArray = [];
        document.querySelector(".adds").remove();

        //   change content
        stepCountainer.querySelector("h1").textContent = "Select your plan";
        stepCountainer.querySelector("p").textContent =
            " You have the option of monthly or yearly billing.";
        const secoundStep = ` 
<div class="box-container duration-500 flex">
<div class="plan">
<span class="img">
<img src="./assets/images/icon-arcade.svg" alt="arcade" />
</span>
<span class="info">
<h1>Arcade</h1>
<p>$9/mo</p>
</span>
</div>
<div class="plan">
<span class="img">
<img src="./assets/images/icon-advanced.svg" alt="advanced" />
</span>
<span class="info">
<h1>Advanced</h1>
<p>$12/mo</p>
</span>
</div>
<div class="plan">
<span class="img">
<img src="./assets/images/icon-pro.svg" alt="pro" />
</span>
<span class="info">
<h1>Pro</h1>
<p>$15/mo</p>
</span>
</div>
</div>

<label
class="inline-flex check items-center cursor-pointer justify-center w-full p-[10px] my-[30px] rounded"
>
<input type="checkbox" value="" class="sr-only peer" />
<span
class="mr-3 text-sm text-marine_Blue font-bold peer-checked:text-Cool_gray duration-500"
>Monthly</span
>
<div
class="relative w-11 h-6 rounded-full peer bg-marine_Blue peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:scale-[0.8] after:transition-all border-gray-600"
></div>
<span
class="ms-3 text-sm font-bold text-Cool_gray peer-checked:text-marine_Blue duration-500"
>
Yearly
</span>
</label>
`;
        stepCountainer.insertAdjacentHTML("beforeend", secoundStep);

        document.querySelectorAll(".box-container .plan").forEach((e) => {
            e.addEventListener("click", () => {
                document
                    .querySelectorAll(".box-container .plan")
                    .forEach((e) => e.classList.remove("active"));
                e.classList.toggle("active");
                plan = e.querySelector("h1").textContent.trim();
            });
        });

        document.querySelector(".peer").addEventListener("click", () => {
            document.querySelector("label").classList.toggle("checked");

            const text = document.querySelectorAll(".box-container .plan .info");

            if (document.querySelector("label").classList.contains("checked")) {
                const offer = `
    <span class="offer">2 months free!</span>
    `;
                text[0].querySelector("p").textContent = "$90/yr";
                text[1].querySelector("p").textContent = "$120/yr";
                text[2].querySelector("p").textContent = "$150/yr";
                text.forEach((e) => e.insertAdjacentHTML("beforeend", offer));
                planDuration = "yearly";
            } else {
                document
                    .querySelectorAll(".box-container .plan .info .offer")
                    .forEach((e) => e.remove());
                text[0].querySelector("p").textContent = "$9/mo";
                text[1].querySelector("p").textContent = "$12/mo";
                text[2].querySelector("p").textContent = "$15/mo";
                planDuration = "monthly";
            }
        });
        document
            .querySelectorAll(".box-container .plan")
            .forEach((e) =>
                plan == e.querySelector("h1").textContent.trim() ?
                e.classList.add("active") :
                ""
            );
        if (planDuration != "monthly") {
            document.querySelector("label").classList.add("checked");
            document.querySelector(".peer").checked = true;
            const text = document.querySelectorAll(".box-container .plan .info");
            const offer = `
      <span class="offer">2 months free!</span>
      `;
            text[0].querySelector("p").textContent = "$90/yr";
            text[1].querySelector("p").textContent = "$120/yr";
            text[2].querySelector("p").textContent = "$150/yr";
            text.forEach((e) => e.insertAdjacentHTML("beforeend", offer));
        }
        //   reload loader
        getLoader(stepCountainer);
    } else if (stepsCount[3].classList.contains("active")) {
        //   change count
        stepsCount[3].classList.remove("active");
        stepsCount[2].classList.add("active");
        document.querySelector(".summary").remove();
        nextBtn.classList.replace("bg-Purplish_Blue", "bg-marine_Blue");
        nextBtn.textContent = "Next Step";
        //   change content
        stepCountainer.querySelector("h1").textContent = "Pick add-ons";
        stepCountainer.querySelector("p").textContent =
            " Add-ons help enhance your gaming experience.";
        const adds = `
    <div class="adds hidden">
<div class="add-ons">
  <span class="check">
      <input type="checkbox" name="check" id="os" class="inline-block">
      </span>
  <span class="text">
      <label for="os" class="m-0 leading-none">Online service</label>
      <p class="m-0 leading-none">Access to multiplayer games</p>
  </span>
  <span class="price">${planDuration == "monthly" ? "+$1/mo" : "+$10/yr"}</span>
</div>
<div class="add-ons">
  <span class="check">
      <input type="checkbox" name="check" id="ls" class="inline-block">
      </span>
  <span class="text">
      <label for="ls" class="m-0 leading-none">Larger storage</label>
      <p class="m-0 leading-none">Extra 1TB of cloud save</p>
  </span>
  <span class="price">${planDuration == "monthly" ? "+$2/mo" : "+$20/yr"}</span>
</div>
<div class="add-ons">
  <span class="check">
      <input type="checkbox" name="check" id="cp" class="inline-block">
      </span>
  <span class="text">
      <label for="cp" class="m-0 leading-none">Customizable Profile</label>
      <p class="m-0 leading-none">Custom theme on your profile</p>
  </span>
  <span class="price">${planDuration == "monthly" ? "+$2/mo" : "+$20/yr"}</span>
</div>
</div>
`;
        stepCountainer.insertAdjacentHTML("beforeend", adds);

        // Make active add-ons effects and save user adds
        document.querySelectorAll(".add-ons input").forEach((e) => {
            e.addEventListener("click", () => {
                e.parentElement.parentElement.classList.toggle("checked");
                let add = [];
                let addName =
                    e.parentElement.parentElement.querySelector(
                        ".text label"
                    ).textContent;
                let addPrice = e.parentElement.parentElement
                    .querySelector(".price")
                    .textContent.split("$")[1];

                add.push(addName, addPrice);

                addsArray.push(add);
                addsArray = removeRepeatedElements(addsArray);
            });
        });
        addsArray.forEach((e) => {
            document.querySelectorAll(".add-ons input").forEach((el) => {
                if (
                    e[0] ==
                    el.parentElement.parentElement.querySelector(".text label")
                    .textContent
                ) {
                    el.parentElement.parentElement.classList.add("checked");
                    el.checked = true;
                }
            });
        });
        // import loader
        getLoader(stepCountainer);
    }
};

// change plan Button

const changePlan = function() {
    //   change count
    stepsCount[3].classList.remove("active");
    stepsCount[1].classList.add("active");
    addsArray = [];
    document.querySelector(".summary").remove();
    nextBtn.classList.replace("bg-Purplish_Blue", "bg-marine_Blue");
    nextBtn.textContent = "Next Step";
    //   change content
    stepCountainer.querySelector("h1").textContent = "Select your plan";
    stepCountainer.querySelector("p").textContent =
        " You have the option of monthly or yearly billing.";
    const secoundStep = ` 
    <div class="box-container duration-500 flex">
    <div class="plan">
    <span class="img">
    <img src="./assets/images/icon-arcade.svg" alt="arcade" />
    </span>
    <span class="info">
    <h1>Arcade</h1>
    <p>$9/mo</p>
    </span>
    </div>
    <div class="plan">
    <span class="img">
    <img src="./assets/images/icon-advanced.svg" alt="advanced" />
    </span>
    <span class="info">
    <h1>Advanced</h1>
    <p>$12/mo</p>
    </span>
    </div>
    <div class="plan">
    <span class="img">
    <img src="./assets/images/icon-pro.svg" alt="pro" />
    </span>
    <span class="info">
    <h1>Pro</h1>
    <p>$15/mo</p>
    </span>
    </div>
    </div>
    
    <label
    class="inline-flex check items-center cursor-pointer justify-center w-full p-[10px] my-[30px] rounded"
    >
    <input type="checkbox" value="" class="sr-only peer" />
    <span
    class="mr-3 text-sm text-marine_Blue font-bold peer-checked:text-Cool_gray duration-500"
    >Monthly</span
    >
    <div
    class="relative w-11 h-6 rounded-full peer bg-marine_Blue peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:scale-[0.8] after:transition-all border-gray-600"
    ></div>
    <span
    class="ms-3 text-sm font-bold text-Cool_gray peer-checked:text-marine_Blue duration-500"
    >
    Yearly
    </span>
    </label>
    `;
    stepCountainer.insertAdjacentHTML("beforeend", secoundStep);

    document.querySelectorAll(".box-container .plan").forEach((e) => {
        e.addEventListener("click", () => {
            document
                .querySelectorAll(".box-container .plan")
                .forEach((e) => e.classList.remove("active"));
            e.classList.toggle("active");
            plan = e.querySelector("h1").textContent.trim();
        });
    });

    document.querySelector(".peer").addEventListener("click", () => {
        document.querySelector("label").classList.toggle("checked");

        const text = document.querySelectorAll(".box-container .plan .info");

        if (document.querySelector("label").classList.contains("checked")) {
            const offer = `
        <span class="offer">2 months free!</span>
        `;
            text[0].querySelector("p").textContent = "$90/yr";
            text[1].querySelector("p").textContent = "$120/yr";
            text[2].querySelector("p").textContent = "$150/yr";
            text.forEach((e) => e.insertAdjacentHTML("beforeend", offer));
            planDuration = "yearly";
        } else {
            document
                .querySelectorAll(".box-container .plan .info .offer")
                .forEach((e) => e.remove());
            text[0].querySelector("p").textContent = "$9/mo";
            text[1].querySelector("p").textContent = "$12/mo";
            text[2].querySelector("p").textContent = "$15/mo";
            planDuration = "monthly";
        }
    });
    document
        .querySelectorAll(".box-container .plan")
        .forEach((e) =>
            plan == e.querySelector("h1").textContent.trim() ?
            e.classList.add("active") :
            ""
        );
    if (planDuration != "monthly") {
        document.querySelector("label").classList.add("checked");
        document.querySelector(".peer").checked = true;
        const text = document.querySelectorAll(".box-container .plan .info");
        const offer = `
          <span class="offer">2 months free!</span>
          `;
        text[0].querySelector("p").textContent = "$90/yr";
        text[1].querySelector("p").textContent = "$120/yr";
        text[2].querySelector("p").textContent = "$150/yr";
        text.forEach((e) => e.insertAdjacentHTML("beforeend", offer));
    }
    //   reload loader
    getLoader(stepCountainer);
};

nextBtn.addEventListener("click", CheckForm);
backBtn.addEventListener("click", back);
