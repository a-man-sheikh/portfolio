const terminal = document.getElementById("terminal");
const welcomeScreen = document.getElementById("welcome-screen");
let inputLine = null;
let commandHistory = [];
let historyIndex = -1;

const commands = {
    "help": "Available commands:\n- 'about': Learn about me\n- 'skills': See my technical skills\n- 'projects': Check out my projects\n- 'education': View my education\n- 'contact': Get my contact info\n- 'clear': Clear the screen",
    "about": "I'm Aman Sheikh, a passionate back-end developer with experience in API integration, database management, and secure data handling.",
    "skills": "Skills:\n- Languages: C/C++, Java/J2EE, HTML, CSS, JavaScript, MySQL\n- Frameworks: Spring Boot, Thymeleaf, React.js\n- Tools: Git/GitHub, VS Code, Eclipse, IntelliJ",
    "projects": "Projects:\n- Smart Contact Manager: A secure user contact management app.\n- Note Taker: An app for creating, reading, updating, and deleting notes.",
    "education": "Education:\n- MCA, Mahakal Institute of Technology (2022-2024)\n- BSC(CS), Govt. Madhav Science College (2019-2022)",
    "contact": "Contact:\n- Email: sheikhaman0321@gmail.com\n- LinkedIn: https://www.linkedin.com/in/a-mansheikh/\n- GitHub: https://github.com/a-man-sheikh",
    "clear": "clear"
};

function createNewLine(content = "", isOutput = false) {
    const line = document.createElement("div");
    line.classList.add("line");

    const prompt = document.createElement("span");
    prompt.classList.add("prompt");
    prompt.innerText = ">_";

    const newSpan = document.createElement("span");
    newSpan.classList.add(isOutput ? "output" : "input");
    newSpan.setAttribute("contenteditable", !isOutput);
    newSpan.setAttribute("id", isOutput ? "" : "input-line");

    if (isOutput) {
        newSpan.innerText = content;
    } else {
        inputLine = newSpan; // Update inputLine to the new input span
    }

    line.appendChild(prompt);
    line.appendChild(newSpan);
    terminal.appendChild(line);
    scrollToBottom();

    // Focus the cursor in the newly created input line
    if (!isOutput) {
        setTimeout(() => {
            inputLine.focus(); // Automatically focus the input line
        }, 10);
    }
}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

function executeCommand(command) {
    terminal.innerHTML = ""; // Clear previous commands and results

    const output = commands[command] || "Command not found. Type 'help' for available commands.";
    if (command === "clear") {
        createNewLine();  // Start with a new prompt line
    } else {
        createNewLine(output, true); // Show command with typing animation
        createNewLine();  // Add prompt for the next command
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const command = inputLine.innerText.trim().toLowerCase();
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        executeCommand(command);
        inputLine.innerText = ""; // Clear the input text
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            inputLine.innerText = commandHistory[historyIndex];
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputLine.innerText = commandHistory[historyIndex];
        } else {
            inputLine.innerText = "";
        }
    }
});

// Initialize with a prompt line to start typing commands
function initTerminal() {
    createNewLine(); // Create the first prompt line
}

window.onload = function () {
    setTimeout(() => {
        welcomeScreen.style.animation = "fadeIn 3s ease-out forwards";
        document.body.style.overflow = "auto";
        terminal.style.display = "block"; // Show terminal after the animation
        initTerminal();
        // Show initial instructions inside terminal after welcome
        createNewLine("Type 'help' to see available commands.", true);
    }, 3500); // Wait for the animation to finish
};
