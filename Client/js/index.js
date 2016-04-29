﻿var main_hex;

document.getElementById("overview").addEventListener("toggled", () => {
    getPlayer();
    screens.overview.visible = true;
});

document.getElementById("overview").addEventListener("detoggled", () => {
    screens.overview.visible = false;
    main_hex.arr = [];
});

window.addEventListener("load", () => {
    document.getElementById("attack_btn").onclick = () => {
        toggleScreen(screens.attack.elm);
    }
    document.getElementById("league_btn").onclick = () => {
        toggleScreen(screens.league.elm);
        getPlayer();
    }
    main_hex = new hexstat("main");
    main_hex.drawLines();
    main_hex.drawOutline();
});

document.getElementById("overview").addEventListener("player", () => { //player* but this code is never used.
    if (!screens.overview.visible)
        return;

    main_hex.maxskill = player.userStats.level * 4; // max of animate arguments
    main_hex.animate([{ "life": player.userStats.life, "speed": player.userStats.speed, "physicalattack": player.userStats.physicalattack, "physicaldefence": player.userStats.physicaldefence, "magicattack": player.userStats.magicattack, "magicdefence": player.userStats.magicdefence, "color": "rgba(57, 174, 221, 0.65)" }]) //{ "life": 25, "speed": 10, "physicalattack": 0, "physicaldefence": 5, "magicattack": 30, "magicdefence": 15, "color": "rgba(0, 0, 0, 0.5)" },

    var timenow = new Date().getTime();
    var diff = timenow - player.age;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    var hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    var mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    var lastloggedin = timenow - player.lastloggedin;
    var llidays = Math.floor(lastloggedin / (1000 * 60 * 60 * 24));
    lastloggedin -= llidays * (1000 * 60 * 60 * 24);
    var llihours = Math.floor(lastloggedin / (1000 * 60 * 60));
    lastloggedin -= llihours * (1000 * 60 * 60);
    var llimins = Math.floor(lastloggedin / (1000 * 60));
    lastloggedin -= llimins * (1000 * 60);

    for (var i = 0; i < document.getElementsByClassName("info_name").length; i++) {
        document.getElementsByClassName("info_name")[i].innerHTML = player.name;
    }
    if (days <= 0) document.getElementById("info_age_days_holder").style.display = "none";
    if (hours <= 0) document.getElementById("info_age_hours_holder").style.display = "none";

    document.getElementById("info_age_days").innerHTML = days + " dagar";
    document.getElementById("info_age_hours").innerHTML = hours + " timmar";
    document.getElementById("info_age_minutes").innerHTML = mins + " minuter";

    if (llimins > 0) {
        document.getElementById("info_currentsession").innerHTML = llimins + " minuters";
        if (llihours > 0) {
            document.getElementById("info_currentsession").innerHTML = llihours + " timmars";
            if (llidays > 0) {
                document.getElementById("info_currentsession").innerHTML = llidays + " dagars";
            }
        }
    }
    else {
        document.getElementById("info_currentsession_holder").style.display = "none";
        document.getElementById("info_currentsession_addon").style.display = "inline";
    }
    //document.getElementById("info_rank").innerHTML = player.bestrank; //fix rank later
    //document.getElementById("info_currentsession").innerHTML = player.bestrank; //fix time later

    var pstats = document.getElementById("player_dataStats");




    pstats.getElementsByClassName("char_life")[0].getElementsByTagName('span')[0].innerHTML = player.userStats.life;
    pstats.getElementsByClassName("char_speed")[0].getElementsByTagName('span')[0].innerHTML = player.userStats.speed;
    pstats.getElementsByClassName("char_physA")[0].getElementsByTagName('span')[0].innerHTML = player.userStats.physicalattack;
    pstats.getElementsByClassName("char_physD")[0].getElementsByTagName('span')[0].innerHTML = player.userStats.physicaldefence;
    pstats.getElementsByClassName("char_magA")[0].getElementsByTagName('span')[0].innerHTML = player.userStats.magicattack;
    pstats.getElementsByClassName("char_magD")[0].getElementsByTagName('span')[0].innerHTML = player.userStats.magicdefence;


    if (player.userstats.skillpoints <= 0) {
        for (var i = 0; i < document.getElementById("player_dataStats").getElementsByTagName("i").length; i++) {
            document.getElementById("player_dataStats").getElementsByTagName("i")[i].style.display = "none";
        }
        pstats.getElementsByClassName("char_life")[0].classList.remove("char_sp_up");
        pstats.getElementsByClassName("char_speed")[0].classList.remove("char_sp_up");
        pstats.getElementsByClassName("char_physA")[0].classList.remove("char_sp_up");
        pstats.getElementsByClassName("char_physD")[0].classList.remove("char_sp_up");
        pstats.getElementsByClassName("char_magA")[0].classList.remove("char_sp_up");
        pstats.getElementsByClassName("char_magD")[0].classList.remove("char_sp_up");
    }
    else {
        pstats.getElementsByClassName("char_life")[0].classList.add("char_sp_up");
        pstats.getElementsByClassName("char_speed")[0].classList.add("char_sp_up");
        pstats.getElementsByClassName("char_physA")[0].classList.add("char_sp_up");
        pstats.getElementsByClassName("char_physD")[0].classList.add("char_sp_up");
        pstats.getElementsByClassName("char_magA")[0].classList.add("char_sp_up");
        pstats.getElementsByClassName("char_magD")[0].classList.add("char_sp_up");
    }


    var ustats = document.getElementById("player_userStats");

    ustats.getElementsByClassName("char_level")[0].innerHTML = player.userStats.level;
    ustats.getElementsByClassName("char_exp")[0].innerHTML = player.userStats.exp;
    ustats.getElementsByClassName("char_rank")[0].innerHTML = player.userStats.rank;
    ustats.getElementsByClassName("char_bestRank")[0].innerHTML = player.userStats.bestrank;
    ustats.getElementsByClassName("char_wins")[0].innerHTML = player.userStats.wins;
    ustats.getElementsByClassName("char_losses")[0].innerHTML = player.userStats.losses;


    ////stats.getElementById("char_age").innerHTML = (new Date()).getTime() - player.userData.age;

});
