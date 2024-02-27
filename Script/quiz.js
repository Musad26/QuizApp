
var forms = document.querySelectorAll('.needs-validation');
var regex = new RegExp(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
var currentQuestion = 0;
const quizContainer = document.getElementById('questionsBank');

$(document).on('ready',function(){

    var phoneInputField = document.querySelector("#phone");
    var phoneInput = window.intlTelInput(phoneInputField, {
      utilsScript: "intlInputTel/js/utils.js",
      autoPlaceholder: "on",
      countrySearch: true,
      preferredCountries: ["sa"],
    });
})

$(document).on('click', '.btnStartQuiz', function (e) {
    //var isFormValid = valdiateForm(e);
    if (true) {
        $('.divStartPage').toggleClass('hideContent');
        $('.quizWrap').toggleClass('hideContent');
        displayQuestion();
    }
});

function valdiateForm(event){
    var isFormValid = true;
     $.each(forms, function(i, ele){
        console.log(forms);
        if (!forms[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            isFormValid = false;
          }            
          $(forms[0]).addClass('was-validated')
     })
    return isFormValid;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /* Display questions */
function displayQuestion() {
    const questionData = quizData[currentQuestion];

    //const divQuestion = document.getElementById('questionsBank');
    const questionElement = document.createElement('div');
    questionElement.className = 'question_' + currentQuestion;
    const question = document.createElement('h5');
    question.innerHTML = questionData.question;
    questionElement.appendChild(question);

    // $('#questionsBank').text(questionData.question);

    //add answers below 
    const optionsElement = document.createElement('div');
    optionsElement.classList.add('row', 'answers');

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const divOption = document.createElement('div');
        divOption.className = 'col-sm-5';

        const optioninnerDiv = document.createElement('div');
        optioninnerDiv.className = 'options';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz'; 
        radio.id = 'option_' + i;       
        radio.value = shuffledOptions[i];

        const optionText = document.createElement('label');
        optionText.setAttribute('for', 'option_' + i);
        optionText.innerHTML = shuffledOptions[i];

        optioninnerDiv.appendChild(radio);
        optioninnerDiv.appendChild(optionText);
        //optioninnerDiv.appendChild(option)
        divOption.appendChild(optioninnerDiv);
        optionsElement.appendChild(divOption);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }