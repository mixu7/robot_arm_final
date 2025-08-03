// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  loadSavedPoses();

  // زر Reset
  document.getElementById('resetBtn').addEventListener('click', () => {
    ['motor1', 'motor2', 'motor3', 'motor4'].forEach(id => {
      document.getElementById(id).value = 90;
    });
  });

  // زر Save Pose
  document.getElementById('saveBtn').addEventListener('click', () => {
    const motor1 = document.getElementById('motor1').value;
    const motor2 = document.getElementById('motor2').value;
    const motor3 = document.getElementById('motor3').value;
    const motor4 = document.getElementById('motor4').value;

    fetch('insert.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ motor1, motor2, motor3, motor4 })
    })
    .then(res => res.text())
    .then(() => loadSavedPoses());
  });
});

// تحميل الوضعيات المحفوظة من القاعدة
function loadSavedPoses() {
  fetch('get_run_pose.php')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('savedPoses');
      container.innerHTML = '<h3>Saved Poses:</h3>';

      data.forEach((pose, index) => {
        const div = document.createElement('div');
        div.className = 'pose-item';
        div.innerHTML = `
          <span>${pose.motor1}, ${pose.motor2}, ${pose.motor3}, ${pose.motor4}</span>
          <div>
            <button onclick="runPose(${pose.id})">▶️</button>
            <button onclick="deletePose(${pose.id})">🗑️</button>
          </div>
        `;
        container.appendChild(div);
      });
    });
}

// زر Run – يعرض القيم فوق + يغير status
function runPose(id) {
  // نقرأ القيم من النص المعروض
  const poseText = document.querySelector(`button[onclick="runPose(${id})"]`)
    .closest('.pose-item')
    .querySelector('span')
    .textContent;

  // نعرضها فوق
  document.getElementById('runningInfo').textContent = `Running: ${poseText} ✅`;

  // نحدث status = 0
  fetch('update_status.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  .then(res => res.text())
  .then(() => loadSavedPoses());
}

// زر حذف
function deletePose(id) {
  fetch(`update_status.php?delete=${id}`)
    .then(res => res.text())
    .then(() => loadSavedPoses());
}