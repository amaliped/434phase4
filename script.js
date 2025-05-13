
window.onload = function () {
  loadUser();
}

let userData;

async function loadUser() {
  try {
    const response = await fetch('user.json');
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    userData = await response.json();
    setGreeting();
    loadGoals();
  } catch (error) {
    console.error('Error loading user data:', error);
  }
}

function setGreeting() {
  if (userData && userData.name) {
    document.getElementById('greeting').innerText = `Hello, ${userData.name}!`;
  }
}

function loadGoals() {
  if (userData.goals.length === 0) {
    document.getElementById('goals').innerText = `You have no goals yet.`;
  } else {
    document.getElementById('goals').innerText = `You have ${userData.goals.length} goals!`;
    document.getElementById('recentGoals').innerText = `Recent Goals`;
    document.getElementById('goal1').innerHTML = `Item: ${userData.goals[userData.goals.length - 1].name} Amount: ${userData.goals[userData.goals.length - 1].amount} Progress: ${userData.goals[userData.goals.length - 1].amountSaved}` || '';
    document.getElementById('goal2').innerText = `Item: ${userData.goals[userData.goals.length - 2].name} Amount: ${userData.goals[userData.goals.length - 2].amount} Progress: ${userData.goals[userData.goals.length - 2].amountSaved}` || '';
    document.getElementById('goal3').innerText = `Item: ${userData.goals[userData.goals.length - 3].name} Amount: ${userData.goals[userData.goals.length - 3].amount} Progress: ${userData.goals[userData.goals.length - 3].amountSaved}` || '';
  }
}

function navigateTo(tab) {
  window.location.href = tab;
}

async function addGoal() {
  const goalNameInput = document.getElementById('goalName');
  const goalAmtInput = document.getElementById('goalAmt');
  const goalCategoryInput = document.getElementById('goalCategory');

  const goalName = goalNameInput.value;
  const goalAmount = goalAmtInput.value;
  const goalCategory = goalCategoryInput.value;

  if (!goalName || !goalAmount || !goalCategory) {
    alert("Please fill out all fields!");
    return;
  }

  const newGoal = {
    name: goalName,
    amount: goalAmount,
    category: goalCategory,
    amountSaved: 0,
    complete: false
  };

  userData.goals.push(newGoal);

  try {
    const response = await fetch('/updateUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Error updating user data');
    }

    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
  }

  goalNameInput.value = '';
  goalAmtInput.value = '';
  goalCategoryInput.value = '';

  loadGoals();



}

