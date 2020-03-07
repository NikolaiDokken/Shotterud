import React, { useEffect, useCallback } from "react";
import $ from "jquery";
import "./Spinner.css";

export default function Spinner(props) {
  const spin = useCallback(() => {
    var users = props.names.map(name => name.name),
      shuffled = [],
      loadout = $("#loadout" + props.nr),
      insert_times = 30,
      duration_time = 10000;

    $("#roll" + props.nr).attr("disabled", true);
    var scrollsize = 0,
      diff = 0;
    $(loadout).html("");
    $("#log" + props.nr).html("");
    loadout.css("left", "100%");
    if (users.length < 10) {
      insert_times = 20;
      duration_time = 5000;
    } else {
      insert_times = 10;
      duration_time = 10000;
    }
    for (var times = 0; times < insert_times; times++) {
      shuffled = users;
      shuffle(shuffled);
      for (var i = 0; i < users.length; i++) {
        loadout.append(
          '<td><div class="roller"><div>' + shuffled[i] + "</div></div></td>"
        );
        scrollsize = scrollsize + 192;
      }
    }

    diff = Math.round(scrollsize / 2);
    diff = randomEx(diff - 300, diff + 300);
    $("#loadout" + props.nr).animate(
      {
        left: "-=" + diff
      },
      duration_time,
      function() {
        $("#roll" + props.nr).attr("disabled", false);
        $("#loadout" + props.nr)
          .children("td")
          .each(function() {
            var center = window.innerWidth / 2;
            if (
              $(this).offset().left < center &&
              $(this).offset().left + 185 > center
            ) {
              var text = $(this)
                .children()
                .text();
              $("#log" + props.nr).append(
                'Skål <span class="badge">' + text + "!</span>"
              );
              $("#prev-names").append(
                "<p style=" +
                  "color:#ff3d42;font-size:20px;font-family:arial;text-transform:uppercase;border-left:groove;border-color:#ff3d42;padding-right:15px;padding-left:15px;margin-top:0px;margin-bottom:0px;" +
                  ">" +
                  text +
                  "</p>"
              );
              var storedPrevNames = JSON.parse(
                sessionStorage.getItem("prevNames")
              );
              var newPrevNames =
                storedPrevNames === null || storedPrevNames === undefined
                  ? []
                  : storedPrevNames;
              newPrevNames.push(text);
              window.sessionStorage.setItem(
                "prevNames",
                JSON.stringify(newPrevNames)
              );
              var scrollTarget = document.getElementById("prev-names");
              scrollTarget.scrollLeft = scrollTarget.scrollWidth;
            }
          });
      }
    );
  }, [props]);

  function randomEx(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function shuffle(arr) {
    var counter = arr.length,
      temp,
      index;
    while (counter > 0) {
      index = (Math.random() * counter--) | 0;
      temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }
  }

  useEffect(() => {
    spin();
  }, [spin]);

  return (
    <div className="container">
      <div className="row topbox">
        <div className="col-md-6 col-md-offset-3 rollbox">
          <div className="line"></div>
          <table>
            <tr className="loadout" id={"loadout" + props.nr}></tr>
          </table>
        </div>
      </div>

      <div className="col-md-12" style={{ textAlign: "center" }}>
        <div className="log" id={"log" + props.nr}></div>
      </div>
    </div>
  );
}
