const questions = document.querySelectorAll(".faq-question");

questions.forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;

    // Close all other answers
    questions.forEach(btn => {
      if (btn !== button) {
        btn.classList.remove("active");
        btn.nextElementSibling.style.maxHeight = null;
        btn.nextElementSibling.classList.remove("open");
      }
    });

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.classList.add("open");
    } else {
      answer.style.maxHeight = null;
      answer.classList.remove("open");
    }
  });
});


