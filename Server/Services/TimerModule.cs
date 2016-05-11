﻿using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using static Server.Services.UserService;

namespace Server.Services
{
    class TimerService
    {
        public static List<TimerService> Timers = new List<TimerService>();

        private static UserService Users = new UserService();
        private static Timer timer;
        private static int currentLID;

        private double ms;

        public TimerService(TimeSpan time, bool skipfirst)
        {
            Init(time.TotalMilliseconds, skipfirst);
        }

        public TimerService(double ms, bool skipfirst)
        {
            Init(ms, skipfirst);
        }

        private double getRemainingMs(double ms)
        {
            return ms - (new TimeSpan(DateTime.Now.Ticks).TotalMilliseconds % ms);
        }

        public void Init(double mss, bool skipfirst)
        {
            ms = mss;
            currentLID = -1;

            if (!skipfirst)
            {
                restartLeaugeAndAward();
            }
            else
            {
                timer = new Timer(); // to reset timer.Elapsed
                timer.Elapsed += (sender, e) => restartLeaugeAndAward();
                startTimer();
            }
        }

        private void startTimer()
        {
            timer.Stop();
            timer.Interval = getRemainingMs(ms);
            timer.Start();
        }

        private void restartLeaugeAndAward()
        {
            startTimer();

            string name = (new Random()).NextDouble() > .5 ? "Eld Tävling" : "Vatten Tävling";
            long start = (long)((DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalMilliseconds), 
                end = (long)((DateTime.UtcNow.AddMilliseconds(ms) - new DateTime(1970, 1, 1)).TotalMilliseconds);

            Users.CreateLeague(new League()
            {
                name = name,
                start = start,
                end = end
            });

            if (currentLID != -1)
            {
                // AWARD THE WINER OF LAST LEAUGE HERE...

            }

            currentLID = Users.GetLeague(name, start, end).ID;            
        }


        public void Stop()
        {
            timer.Stop();
        }

        public void Start()
        {
            timer.Interval = getRemainingMs(ms);
            timer.Start();
        }
    }
}