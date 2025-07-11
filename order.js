const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');
const dishesContainer = document.getElementById('dishesContainer');
const addressInput = document.getElementById('address');
const notesInput = document.getElementById('notes');
let dishCount = 0;

phoneInput.addEventListener('input', () => {
  const value = phoneInput.value;
  const regex = /^[0-9]{0,10}$/;

  if (!regex.test(value)) {
    phoneError.style.display = 'block';
    phoneInput.style.border = '1px solid red';
  } else {
    phoneError.style.display = 'none';
    phoneInput.style.border = '';
  }
});

function addDish() {
  dishCount++;

  const dishBlock = document.createElement('div');
  dishBlock.className = 'dish-block';

  const canRemove = dishCount > 1;

  dishBlock.innerHTML = `
    <h3>מנה ${dishCount} <span style="color: crimson;">* כוללת שקית צ'יפס</span></h3>
    <input type="text" placeholder="שם מיועד למנה" required>
    <label>לבחירת מנה עיקרית:</label>
    <select required onchange="toggleExtrasOptions(this, ${dishCount})">
      <option disabled selected value="">בחירת מנה</option>
      <option>שוורמה הודו</option>
      <option>שוורמה עגל</option>
      <option>פרגית</option>
      <option>קבב</option>
      <option>שניצל</option>
      <option>חזה עוף</option>
      <option>קציצות</option>
      <option>לבבות עוף</option>
      <option>כבד עוף</option>
      <option>משפחתי גדול</option>
    </select>

    <div class="bread-options" id="breadOptions${dishCount}">
      <label>במה לשים:</label>
      <label><input type="radio" name="bread${dishCount}" value="פיתה"> פיתה</label>
      <label><input type="radio" name="bread${dishCount}" value="לאפה"> לאפה</label>
      <label><input type="radio" name="bread${dishCount}" value="באגט"> באגט</label>
      <label><input type="radio" name="bread${dishCount}" value="צלחת"> צלחת</label>
    </div>

    <div class="extras-container" id="extrasContainer${dishCount}">
      <label>בחירת תוספות למנה:</label>
      <label><input type="checkbox" class="extra" value="חריף"> חריף</label>
      <label><input type="checkbox" class="extra" value="טחינה"> טחינה</label>
      <label><input type="checkbox" class="extra" value="עמבה"> עמבה</label>
      <label><input type="checkbox" class="extra" value="לימון"> לימון</label>
      <label><input type="checkbox" class="extra" value="כרוב סגול"> כרוב סגול</label>
      <label><input type="checkbox" class="extra" value="כרוב לבן"> כרוב לבן</label>
      <label><input type="checkbox" class="extra" value="חציל"> חציל</label>
      <label><input type="checkbox" class="extra" value="בצל"> בצל</label>
      <label><input type="checkbox" class="extra" value="סלט חי"> סלט חי</label>
      <label><input type="checkbox" class="extra" value="מלפפון חמוץ"> מלפפון חמוץ</label>
    </div>

    <label>בחר מנה פתיחה:</label>
    <select onchange="toggleAppetizerOption(this)">
      <option>ללא מנה פתיחה</option>
      <option>סיגרים (3 יח')</option>
      <option>קובה מטוגנת (1)</option>
      <option>קובה מטוגנת (3)</option>
      <option>כרובית מטוגנת</option>
      <option>כדורי פירה</option>
      <option>טבעות בצל</option>
      <option>צ'יפס קטן</option>
    </select>

    <label>בחר שתייה:</label>
    <select onchange="toggleDrinkOption(this)">
      <option>ללא שתייה</option>
      <option>פחית ספרייט</option>
      <option>פחית ספרייט זירו</option>
      <option>פחית קולה</option>
      <option>פחית קולה זירו</option>
      <option>סודה</option>
      <option>מים</option>
      <option>זירו</option>
      <option>פחית פנטה</option>
      <option>מיץ אשכוליות</option>
      <option>ענבית</option>
      <option>קולה גדול</option>
      <option>קולה זירו גדול</option>
    </select>

    ${canRemove ? '<button type="button" class="remove-dish" onclick="removeDish(this)">הסר מנה</button>' : ''}
  `;

  dishesContainer.appendChild(dishBlock);
}

function removeDish(button) {
  button.parentElement.remove();
}

function toggleExtrasOptions(selectElement, dishId) {
  const extrasContainer = document.getElementById(`extrasContainer${dishId}`);
  const breadOptions = document.getElementById(`breadOptions${dishId}`);

  if (selectElement.value) {
    extrasContainer.style.display = 'block';  // להציג את תוספות
    breadOptions.style.display = 'block';    // להציג את סוג הפיתה
  } else {
    extrasContainer.style.display = 'none';   // להסתיר את תוספות
    breadOptions.style.display = 'none';      // להסתיר את סוג הפיתה
  }
}

function toggleAppetizerOption(selectElement) {
  const appetizerOption = selectElement.value;
  if (appetizerOption === "") {
    selectElement.classList.remove('selected');
  } else {
    selectElement.classList.add('selected');
  }
}

function toggleDrinkOption(selectElement) {
  const drinkOption = selectElement.value;
  if (drinkOption === "") {
    selectElement.classList.remove('selected');
  } else {
    selectElement.classList.add('selected');
  }
}

// שליחת ההזמנה לווטסאפ עם כל הפרטים
document.getElementById('whatsappButton').addEventListener('click', function() {
  const phone = phoneInput.value;
  const address = addressInput.value;
  const notes = notesInput.value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'לא נבחר';
  
  let dishesText = '';
  let appetizersText = '';
  let drinksText = '';
  let extrasText = '';

  // לולאה על כל המנות שנבחרו
  const dishes = dishesContainer.querySelectorAll('.dish-block');
  dishes.forEach(dish => {
    const mainDish = dish.querySelector('select').value;
    const appetizer = dish.querySelector('select + select')?.value || 'ללא מנה פתיחה';
    const drink = dish.querySelector('select + select + select')?.value || 'ללא שתייה';
    const bread = dish.querySelector('input[name^="bread"]:checked')?.value || 'לא נבחר';
    
    let extras = [];
    dish.querySelectorAll('.extra:checked').forEach(extra => {
      extras.push(extra.value);
    });

    dishesText += `מנה עיקרית: ${mainDish}\n`;
    appetizersText += `מנה פתיחה: ${appetizer}\n`;
    drinksText += `שתייה: ${drink}\n`;
    extrasText += `תוספות: ${extras.join(', ')}\n`;
  });

  const message = `
    הזמנה חדשה\n
    טלפון: ${phone}\n
    כתובת: ${address}\n
    תשלום: ${paymentMethod}\n
    הערות: ${notes}\n\n
    ${dishesText}\n
    ${appetizersText}\n
    ${drinksText}\n
    ${extrasText}
  `;

  const whatsappNumber = '+972523224223';
  const encodedMessage = encodeURIComponent(message);

  // שליחה לווטסאפ
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
});
