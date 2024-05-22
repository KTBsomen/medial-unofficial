import Medial  from '../index.js';
console.log(Medial)
const medial=new Medial("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI3NDQyNjU2NDZlZmY4ZGMxNzBiZGQiLCJzdGF0dXMiOiJBQ1RJVkUiLCJkb21haW4iOiJNZWRpYWwiLCJpYXQiOjE3MTYxNDg0ODYsImV4cCI6MTczMTcwMDQ4Nn0.o52OwXYgazvkKV5InPbCpJL6VWVbSKr4mJ8zfGM6pPcQJJOooXlt8FfBYMvNG2ZLQx1b_vWJWrv4VevH9cq1Hb2J2FcGgbyviIzcweTMcHvwrwJBRmtGo-xX-ZMDqdhHqcOcrpq-LkXDwzhEbUfc1AFDwzsUualxxstbLEo7tTVc1bzPBkQa4jOr7y7WH7bsy1RJLJp0SE4lnogO_lm5P1N2EoWvFlDB9MeEVcsDfw5aovtm2WR2JfZ1jaxhvC9BW_r07-ypSx-Ra-gtg-fR7f60kOzCG_AY0Lz3ingz_UECLfy9d-Cx7ySUfuHn37izu-ZHzWwOyDJ1suStuBb3UdnHTLjhl7CuuSInD6EWAD7Olx-fqP7wX4_qpH3Jx8rgDBZVcL3S4FmmRkvsjUiCv4SfYlyDhT8CA1rCVEy8GoIT0PGGxjnYVVI5P2lSzqdXT89O-8NNBHV0nIyOQrygQB0e4vg9xJDxZCXmML_FVEodRRbi3VoN6DKj1DqExxeZqXSUu2MayzWmEZ0b09t-xo5aTbPIsq1jyAjWAxD8zCoVZNooBzwmjXS6HDoFr6Ri26B6lfHRRnySdMNj7vZQGsMhecoFSHy4qDmR3C99sKEYn8bB2i1DL4BlyoVLLfsnwHMxkkdyNYV3l3mXB0l7HzGcPkC7ZCiegH7LmEpiuyc")
var pods=await medial.getPods()
console.log(pods)

var res=await medial.sendPost({
    content:`
    Someone in ancient times said, "An idea is imagination; execution is real." This truth has been my life's theme song. About 5 years ago, I had this brilliant idea for a medical app. I dove into learning and building the frontend and some backend with SQL and PHP. I was on a roll!

Then, one night at around midnight, my friend called me with the urgency of a late-night infomercial. "I got a job offer! They need a MongoDB Node.js Express developer," he said. I didn’t even know what those words meant, but the interview was the next day. With my trusty raw JavaScript knowledge, I pulled an all-nighter learning these mysterious new technologies.

The next day, I showed up for the interview with more caffeine than blood in my veins. They asked me to design a basic help module for a broadband provider, then threw me into a coding round. It was intense, like being on a cooking show where you just learned to boil water the night before. I made some mistakes, including a security bug (cut me some slack; I just learned this stuff!), but somehow, I cracked it and got the job.

However, my dream of completing the Medial app stalled at 50%. Every time I tried to download progress, it failed like a video buffering on a bad connection. But the Medial app idea never left my mind; it’s been resonating with me like a catchy song I can’t stop humming.

Now, I’m ready to jump back in. I don’t care what role I play—any tech-related gig will do. I just want to be part of this project and see it grow.

Founders, if you’re out there, I’m here and ready to code, and learn along the way. Let’s make Medial the NEXT BIG THING!
https://github.com/KTBsomen (I created some projects you can check also there are moe which is not in github)
    `,
    referenceId:"65c62d5d6bda32000efafb6b",
    

})
console.log(res)



