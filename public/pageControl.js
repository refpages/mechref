
$(document).ready(function() {
    // page structure
    /*
    $("body").children().wrapAll('<div class="mainBlock"/>');
    $("div.mainBlock").wrap('<div class="container"/>');
    $("div.container").prepend('<div class="navbar"><ul><li><a href="index.html" id="navHome">Home</a></li><li><a href="info.html" id="navInfo">Info</a></li><li><a href="people.html" id="navPeople">People</a></li><li><a href="sched.html" id="navSched">Schedule</a></li><li><a href="ref.html" id="navRef">Reference</a></li><li><a href="apps.html" id="navApps">Applications</a></li></ul></div>');
    //$("div.container").prepend('<div class="header"><div class="login"><p>Log in</p></div><h1>TAM 212: Introductory Dynamics</h1></div>');
    $("div.container").prepend('<div class="header"><h1>TAM 212: Introductory Dynamics</h1></div>');
    $("div.container").append('<div class="footer"><p class="copyright">Copyright (C) 2012-2015 Matthew West</p></div>');
    */

    // disable the browserWarning on Chrome
    var browserRE = /Chrome\/([1-9][0-9]*)/;
    var matchArray = browserRE.exec(navigator.userAgent);
    if (matchArray) {
        var version = parseInt(matchArray[1]);
        if (version >= 24) {
            $("div.browserWarning").hide();
        }
    }

    // make sure every contentBlock has an infoCol
    $("div.contentBlock").each(function() {
        if ($(this).children("div.infoCol").length == 0) {
            $(this).append('<div class="infoCol"></div>');
        }
    });
    // infoBox headers
    $("div.factBox").prepend('<h2>Did you know?</h2>');
    $("div.notationBox").prepend('<h2>Notation note</h2>');
    $("div.requirementsBox").prepend('<h2>Reference material</h2>');
    $("div.applicationsBox").prepend('<h2>Related applications</h2>');
    $("div.conceptsBox").prepend('<h2>Relevant concepts</h2>');
    $("div.warningBox").prepend('<h2>Warning!</h2>');
    $("div.linksBox").prepend('<h2>Extra links</h2>');

    // active navigation link
    var activeNavId;
    if (/index\.html$/.test(window.location.pathname)) {
        activeNavId = "navHome";
    } else if (/\/$/.test(window.location.pathname)) {
        activeNavId = "navHome";
    } else if (/r[a-z]+\.html$/.test(window.location.pathname)) {
        activeNavId = "navRef";
    } else if (/a[a-z]+\.html$/.test(window.location.pathname)) {
        activeNavId = "navApps";
    } else {
        console.log("Warning: unable to determine active navigation");
    }
    $("a#" + activeNavId).closest("li").addClass("activeNav");

    // Derivation header
    $("div.envContainer.derivation").prepend('<p class="envHeader">Derivation</p>');

    // Solution header
    $("div.envContainer.solution").prepend('<p class="envHeader">Solution</p>');

    // if we have a hash in the URL, set the corresponding element
    var linkedElem = document.getElementById(window.location.hash.slice(1))

    // Container show/hide
    var hideableContainerDivs = $("div.envContainer").not(".equation")
    hideableContainerDivs.children("p.envHeader").prepend('<button class="envShowHide">-</button>');
    var divsToHide = hideableContainerDivs.not(linkedElem);
    divsToHide.children("div.envBody").hide();
    divsToHide.find("button.envShowHide").text("+");

    // Show/hide buttons
    var hide = function(jButton, doFast) {
        envBody = jButton.closest("div.envContainer").children("div.envBody");
        
        if (doFast) {
            envBody.hide();
        } else {
            envBody.slideUp();
        }
        envBody.find("canvas").each(function() {
            if (this.prairieDraw) {
                this.prairieDraw.stop();
            }
        });
        jButton.text("+");
    }
    var show = function(jButton, doFast) {
        envBody = jButton.closest("div.envContainer").children("div.envBody");
        if (doFast) {
            envBody.show();
        } else {
            envBody.slideDown();
        }
        envBody.find("canvas").each(function() {
            if (this.prairieDraw) {
                this.prairieDraw.reset();
            }
        });
        jButton.text("-");
    }
    var toggle = function(jButton) {
        if (jButton.text() == "+") {
            show(jButton);
        } else {
            hide(jButton);
        }
    }
    $("button.envShowHide").click(function() {toggle($(this));});

    // Schedule page
    /*
    $("table.schedule").find("tr").slice(1).each(function() {
        var weekNumber = parseInt($(this).find("td").first().text());
        if (Math.floor(weekNumber % 2 == 0)) {
            $(this).addClass("evenWeek");
        } else {
            $(this).addClass("oddWeek");
        }
    });
    */

    // Show all / hide all
    /*
    $("div.infoCol").first().prepend('<div class="infoBox pageControl"><p class="infoHead">Debug page control</p><p><button class="hideAll showHideAll">Collapse all</button><button class="showAll showHideAll">Expand all</button></p></div>');
    $("button.showAll").click(function() {$("button.envShowHide").each(function() {show($(this), true);});});
    $("button.hideAll").click(function() {$("button.envShowHide").each(function() {hide($(this), true);});});
    */

    // External links
    //$('a[href^="http://"]').addClass("externalLink").after('&#xa0;<span data-icon="/" aria-hidden="true" class="externalLinkIcon"></span>');

    // Anchors
    var makeLocalAnchor = function(jDiv) {
        var fixedId = jDiv.attr("id").replace(/-/g, "‑"); // non-breaking hyphen replace
        return '<a class="anchor" href="#' + jDiv.attr("id") + '">#' + fixedId + '</a>';
    };
    $("div.envContainer[id]").each(function() {
        $(this).find(".envHeader").first().append(makeLocalAnchor($(this)));
    });
    $("div.contentCol[id]").each(function() {
        $(this).find(":header").first().append(makeLocalAnchor($(this)));
    });
    $("div.figureContainer[id]").each(function() {
        $(this).find("p.figureCaption").append(makeLocalAnchor($(this)));
    });
    $("div.infoBox[id]").each(function() {
        $(this).find(":header").first().append(makeLocalAnchor($(this)));
    });
    $("div.pageControl").append('<p><button class="hideAnchors showHideAnchors">Hide anchors</button><button class="showAnchors showHideAnchors">Show anchors</button></p>');
    $("button.showAnchors").click(function() {$("a.anchor").css("visibility", "visible");});
    $("button.hideAnchors").click(function() {$("a.anchor").css("visibility", "hidden");});

    // Anchors on TOC pages
    $("div.tocColumn").find("a").each(function() {
        var href = $(this).attr("href");
        if (href === undefined) return;
        var anchorSearch = /([^\/]+)\.x?html$/.exec(href);
        if (anchorSearch === null) return;
        var anchorName = anchorSearch[1]
        if (anchorName === null) return;
        var anchor = '<a class="anchor" href="' + href + '">#' + anchorName + '</a>';
        $(this).after(anchor);
    });

    // Controller buttons
    var getPD = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error("Unable to find canvas with ID: " + canvasId);
        }
        var pd = canvas.prairieDraw;
        if (!pd) {
            throw new Error("Unable to find PrairieDraw controller for canvas with ID: " + canvasId);
        }
        return pd;
    }
    var showCheckbox = function(jButton, checked) {
        if (jButton.children("span").length == 0) {
            jButton.append('<span data-icon="B" aria-hidden="true" class="checkbox"></span>');
        }
        if (checked) {
            jButton.children("span.checkbox").attr("data-icon", "B");
        } else {
            jButton.children("span.checkbox").attr("data-icon", ",");
        }
    }
    var bindAnimToggleButton = function(jButton, canvasId) {
        var pd = getPD(canvasId);
        jButton.click(function() {pd.toggleAnim();});
        pd.registerAnimCallback(function(animated) {showCheckbox(jButton, animated);});
    }
    var bindOptionToggleButton = function(jButton, canvasId, optionName) {
        var pd = getPD(canvasId);
        jButton.click(function() {pd.toggleOption(optionName);});
        pd.registerOptionCallback(optionName, function(value) {showCheckbox(jButton, value);});
    }
    var bindSeqToggleButton = function(jButton, canvasId, seqName) {
        var pd = getPD(canvasId);
        jButton.click(function() {pd.stepSequence(seqName);});
        pd.registerSeqCallback(seqName, function(event, index, stateName) {
            var checked = (((event === "exit") && (index == 0))
                           || ((event === "enter") && (index == 1)));
            showCheckbox(jButton, checked);
        });
    }
    var bindSeqStepButton = function(jButton, canvasId, seqName, stateName) {
        var pd = getPD(canvasId);
        jButton.click(function() {pd.stepSequence(seqName, stateName);});
        pd.registerSeqCallback(seqName, function(event, index, currentStateName) {
            var active = (event === "enter") && (stateName === currentStateName);
            if (active) {
                jButton.removeClass("inactive").addClass("active");
            } else {
                jButton.removeClass("active").addClass("inactive");
            }
        });
    }
    var bindResetButton = function(jButton, canvasId) {
        var pd = getPD(canvasId);
        jButton.click(function() {pd.reset();});
    }
    $("button[class]").each(function() {
        var classList = $(this).attr("class").split(/\s+/);
        var d;
        for (var i = 0; i < classList.length; i++) {
            d = /^anim-toggle:([^:]+)$/.exec(classList[i]);
            if (d !== null) bindAnimToggleButton($(this), d[1]);
            d = /^option-toggle:([^:]+):([^:]+)$/.exec(classList[i]);
            if (d !== null) bindOptionToggleButton($(this), d[1], d[2]);
            d = /^seq-toggle:([^:]+):([^:]+)$/.exec(classList[i]);
            if (d !== null) bindSeqToggleButton($(this), d[1], d[2]);
            d = /^seq-step:([^:]+):([^:]+):([^:]+)$/.exec(classList[i]);
            if (d !== null) bindSeqStepButton($(this), d[1], d[2], d[3]);
            d = /^reset:([^:]+)$/.exec(classList[i]);
            if (d !== null) bindResetButton($(this), d[1]);
        }
    });

    // Data input binding
    var bindDataInputRange = function(jInput, canvasId, optionName) {
        var pd = getPD(canvasId);
        // disabling the following line
        // these should get set from the default values in the JS
        // this isn't very well tested, so it might need some more work
        //pd.setOption(optionName, parseFloat(jInput.val()));
        jInput.on("input change", function() {
            pd.setOption(optionName, parseFloat($(this).val()), undefined, jInput);
        });
        pd.registerOptionCallback(optionName, function(value, trigger) {
            if (trigger !== jInput) {
                // someone else caused this change, so reflect it
                jInput.val(value);
            }
        });
    };
    var bindDataInputRadio = function(jInput, canvasId, optionName) {
        var pd = getPD(canvasId);
        jInput.change(function() {
            pd.setOption(optionName, jInput.val(), undefined, jInput);
        });
        pd.registerOptionCallback(optionName, function(value, trigger) {
            if (trigger === undefined || trigger.prop("name") !== jInput.prop("name")) {
                // either no radio group or a different radio group caused this change, so reflect it
                if (jInput.val() === value) {
                    jInput.prop("checked", true);
                } else {
                    jInput.prop("checked", false);
                }
            }
        });
    };
    $("input[class]").each(function() {
        var classList = $(this).attr("class").split(/\s+/);
        var d;
        for (var i = 0; i < classList.length; i++) {
            d = /^data-input:([^:]+):([^:]+)$/.exec(classList[i]);
            if (d !== null) {
                if ($(this).attr("type") == "range") {
                    bindDataInputRange($(this), d[1], d[2]);
                } else if ($(this).attr("type") == "radio") {
                    bindDataInputRadio($(this), d[1], d[2]);
                }
            }
        }
    });

    // Data option binding
    var bindDataOption = function(jSpan, canvasId, optionName) {
        var pd = getPD(canvasId);
        pd.registerOptionCallback(optionName, function(value) {
            jSpan.text(String(value));
        });
    }
    $("span[class]").each(function() {
        var classList = $(this).attr("class").split(/\s+/);
        var d;
        for (var i = 0; i < classList.length; i++) {
            d = /^data-option:([^:]+):([^:]+)$/.exec(classList[i]);
            if (d !== null) bindDataOption($(this), d[1], d[2]);
        }
    });
});
