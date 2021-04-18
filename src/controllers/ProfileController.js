const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },
  async update(req, res) {
    //req.body para pegar dados
    const data = req.body;
    //definir quantidade de semanas no ano
    const weeksPerYear = 52;
    //subtrair semanas de férias no ano para obter a média de semamas de trabalho por mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    //total de horas de trabalho por semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    //total de horas de trabalho por mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    //valor estimado da minha hora de trabalho
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...data,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
