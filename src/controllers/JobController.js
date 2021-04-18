const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  create(req, res) {
    return res.render("job");
  },
  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), //timestamp
    });

    return res.redirect("/");
  },
  async show(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();
    const job = jobs.find((job) => job.id === Number(jobId));
    if (!job) {
      return res.send("Job not found!");
    }
    const profile = await Profile.get();
    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);
    return res.render("job-edit", { job });
  },
  async update(req, res) {
    const jobId = req.params.id;
    
    const data = req.body;
    const updatedJob = {
      name: data.name,
      "total-hours": data["total-hours"],
      "daily-hours": data["daily-hours"],
    };
    
    await Job.update(updatedJob, jobId);

    return res.redirect("/job/" + jobId);
  },
  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect("/");
  },
};
