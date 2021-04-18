

module.exports = {
  remainingDays(job) {
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDate = createdDate.setDate(dueDay);
    const timeDiffInMs = dueDate - Date.now();
    //transformar milisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24;
    // dias restantes arrendondando para baixo
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

    return dayDiff;
  },
  calculateBudget(job, valueHour) {
    const budget = valueHour * job["total-hours"];
    return budget;
  },
};
