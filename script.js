document.getElementById('num-questions').addEventListener('input', function() {
    const numQuestions = parseInt(this.value);
    const container = document.getElementById('questions-container');
    container.innerHTML = ''; 
    
    for (let i = 0; i < numQuestions; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-block');
        
        questionDiv.innerHTML = `
            <label>السؤال ${i + 1}:</label>
            <input type="text" name="question-${i}" required>
            <label>الخيار A:</label>
            <input type="text" name="option-${i}-a" required>
            <label>الخيار B:</label>
            <input type="text" name="option-${i}-b" required>
            <label>الخيار C:</label>
            <input type="text" name="option-${i}-c" required>
            <label>الخيار D:</label>
            <input type="text" name="option-${i}-d" required>
            <label>الإجابة الصحيحة:</label>
            <select name="correct-answer-${i}" required>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
            </select>
        `;
        
        container.appendChild(questionDiv);
    }
});

function generateQuiz() {
    let title = document.getElementById('quiz-title').value;
    let numQuestions = parseInt(document.getElementById('num-questions').value);
    let timeLimitInMinutes = parseInt(document.getElementById('quiz-time').value);
    let timeLimit = timeLimitInMinutes * 60; 
    
    let questions = [];
    
    for (let i = 0; i < numQuestions; i++) {
        let questionText = document.querySelector(`input[name="question-${i}"]`).value;
        let options = {
            a: document.querySelector(`input[name="option-${i}-a"]`).value,
            b: document.querySelector(`input[name="option-${i}-b"]`).value,
            c: document.querySelector(`input[name="option-${i}-c"]`).value,
            d: document.querySelector(`input[name="option-${i}-d"]`).value
        };
        let answer = document.querySelector(`select[name="correct-answer-${i}"]`).value;
        
        questions.push({
            question: questionText,
            options: options,
            answer: answer
        });
    }
    
    let quizHtmlContent = `
    <!DOCTYPE html>
    <html lang="ar">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="style.css">
        <style>body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(to right, #74ebd5, #acb6e5);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    max-width: 700px;
    width: 90%;
    border: 1px solid #dbe2e8;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #4a90e2;
    font-family: 'Arial', sans-serif;
    font-size: 28px;
}

.timer {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
    color: #4a90e2;
}

.question-container {
    margin-bottom: 20px;
    color: #333333;
    font-size: 20px;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.option {
    display: flex;
    align-items: center;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 16px;
    border: 2px solid #e0e0e0;
    transition: background 0.3s, border-color 0.3s, transform 0.3s;
}

.option input {
    margin-right: 20px;
    transform: scale(1.3);
}

.option:hover {
    background: #e0f2f1;
    border-color: #4a90e2;
    cursor: pointer;
    transform: scale(1.02);
}

.option-content {
    display: flex;
    align-items: center;
    color: #444444;
    font-size: 18px;
}

.option-text {
    margin-left: 12px;
}

.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.nav-btn {
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
}

.nav-btn:disabled {
    background-color: #cccccc;
}

.result {
    text-align: center;
}

#retry-btn {
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
}
/* Add these styles to your existing CSS file */

#answers-summary {
    margin-top: 20px;
}

#questions-summary {
    list-style-type: none;
    padding: 0;
}

.question-summary {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #f9f9f9;
}

.question-summary p {
    margin: 0;
    font-size: 16px;
    color: #333333;
}

.correct-answer {
    color: green;
    font-weight: bold;
}

.incorrect-answer {
    color: red;
    font-weight: bold;
}</style>
    </head>
    <body>
        <div class="container">
            <h1>${title}<h5>BY MD</h1>
            <div id="timer" class="timer">الوقت المتبقي: <span id="time">${timeLimitInMinutes}:00</span></div>
            <div id="quiz">
                <div class="progress">
                    <p>السؤال <span id="question-number">1</span> من <span id="total-questions">${numQuestions}</span></p>
                </div>
                <div class="question-container">
                    <p id="question">${questions[0].question}</p>
                </div>
                <div class="options">
                    <label class="option">
                        <input type="radio" name="option" value="a">
                        <span class="option-content">A) <span class="option-text" id="option-a">${questions[0].options.a}</span></span>
                    </label>
                    <label class="option">
                        <input type="radio" name="option" value="b">
                        <span class="option-content">B) <span class="option-text" id="option-b">${questions[0].options.b}</span></span>
                    </label>
                    <label class="option">
                        <input type="radio" name="option" value="c">
                        <span class="option-content">C) <span class="option-text" id="option-c">${questions[0].options.c}</span></span>
                    </label>  
                    <label class="option">
                        <input type="radio" name="option" value="d">
                        <span class="option-content">D) <span class="option-text" id="option-d">${questions[0].options.d}</span></span>
                    </label> 
                </div>
                <div class="navigation">
                    <button id="prev-btn" class="nav-btn" disabled>السابق</button>
                    <button id="next-btn" class="nav-btn">التالي</button>
                </div>
            </div>
            <div id="result" class="result" style="display: none;">
                <h2>نتيجة الاختبار</h2>
                <p id="score">الدرجة: 0</p>
                <div id="answers-summary">
                    <h3>ملخص الأسئلة والإجابات</h3>
                    <ul id="questions-summary"></ul>
                </div>
                <button id="retry-btn">إعادة الاختبار</button>
            </div>
        </div>
        <script>
            let questions = ${JSON.stringify(questions)};
            let currentQuestionIndex = 0;
            let score = 0;
            let totalQuestions = questions.length;
            let timer;
            let timeLimit = ${timeLimit}; // تم التعديل لتصبح بالثواني بعد التحويل
            let userAnswers = [];

            document.addEventListener('DOMContentLoaded', () => {
                loadQuestion();
                startTimer();
                
                document.getElementById('next-btn').addEventListener('click', () => {
    let selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
        if (selectedOption.value === questions[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            loadQuestion();

            // Uncheck all options
            document.querySelectorAll('input[name="option"]').forEach(option => option.checked = false);
        } else {
            endQuiz();
        }
    }
});

                document.getElementById('prev-btn').addEventListener('click', () => {
                    if (currentQuestionIndex > 0) {
                        currentQuestionIndex--;
                        loadQuestion();
                    }
                });

                document.getElementById('retry-btn').addEventListener('click', () => {
                    currentQuestionIndex = 0;
                    score = 0;
                    userAnswers = [];
                    document.getElementById('result').style.display = 'none';
                    document.getElementById('quiz').style.display = 'block';
                    startTimer();
                    loadQuestion();
                });
            });

            function loadQuestion() {
                let question = questions[currentQuestionIndex];
                document.getElementById('question').textContent = question.question;
                for (let option in question.options) {
                    document.getElementById(\`option-\${option}\`).textContent = question.options[option];
                }
                document.getElementById('question-number').textContent = currentQuestionIndex + 1;
                document.getElementById('total-questions').textContent = totalQuestions;
                document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
            }

            function startTimer() {
                let timeDisplay = document.getElementById('time');
                timer = setInterval(() => {
                    if (timeLimit <= 0) {
                        clearInterval(timer);
                        endQuiz();
                        return;
                    }
                    let minutes = Math.floor(timeLimit / 60);
                    let seconds = timeLimit % 60;
                    timeDisplay.textContent = \`\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}\`;
                    timeLimit--;
                }, 1000);
            }

            function endQuiz() {
                document.getElementById('quiz').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                document.getElementById('score').textContent = \`الدرجة: \${score}\`;
                
                let questionsSummary = document.getElementById('questions-summary');
                questionsSummary.innerHTML = '';
                
                questions.forEach((question, index) => {
                    let userAnswer = userAnswers[index] || 'لم يتم اختيار إجابة';
                    let correctAnswer = question.answer;
                    let userAnswerText = question.options[userAnswer] || 'لم يتم اختيار إجابة';
                    let correctAnswerText = question.options[correctAnswer];
                    
                    let answerClass = userAnswer === correctAnswer ? 'correct-answer' : 'incorrect-answer';
                    
                    let summaryItem = document.createElement('li');
                    summaryItem.className = 'question-summary';
                    summaryItem.innerHTML = \`
                        <p>السؤال \${index + 1}: \${question.question}</p>
                        <p>إجابتك: <span class="\${answerClass}">\${userAnswerText}</span></p>
                        <p>الإجابة الصحيحة: <span class="correct-answer">\${correctAnswerText}</span></p>
                    \`;
                    questionsSummary.appendChild(summaryItem);
                });
                
                clearInterval(timer);
            }
        </script>
    </body>
    </html>
    `;
    
    let blob = new Blob([quizHtmlContent], { type: "text/html" });
    let downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${title}.html`;
    
    document.getElementById('generated-quiz').style.display = 'block';
}