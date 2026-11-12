
/*-- PAGE TRANSITIONS --------------------------------------*/

    /* Definitions */

        var pageContent = document.querySelector('body');


    /* Actions */

        document.addEventListener('DOMContentLoaded', function(event) {
            setTimeout(function() {
                pageContent.style.opacity = 1}, 600)
        })




/*-- SURVEY NAVIGATION --------------------------------------*/

    /* Definitions */

        // Sections

        var loadingSection      = document.getElementById('loading');
        var introSection        = document.getElementById('intro');
        var surveySection       = document.getElementById('survey');
        var resultSection       = document.getElementById('result');
        var outtroSection       = document.getElementById('outtro');


        // Controls

        var buttonStart         = document.getElementById('start-survey');
        var buttonPrev          = document.getElementById('prev');
        var buttonNext          = document.getElementById('next');
        var buttonReturn        = document.getElementById('return-survey');
        var buttonSubmit        = document.getElementById('submit');


        // Other

        var navBar              = document.getElementById('navBar');


    /* Actions */


        // Transition out of loading section.

        document.transitionLoading = function(href) {
            loadingSection.classList.add('hidden');

            setTimeout(function() {
                introSection.classList.remove('hidden');
                buttonStart.classList.remove('hidden');
                }, 1000)
        };


        // Start survey section.

        buttonStart.onclick = function() {
            introSection.classList.add('hidden');

            setTimeout(function() {
                surveySection.classList.remove('hidden');
                }, 1000)
        };


        // Return to survey section.

        buttonReturn.onclick = function() {
            resultSection.classList.add('hidden');

            setTimeout(function() {
                surveySection.classList.remove('hidden');
                }, 1000)
        };


        // Submit survey – show outtro and send results.

        document.submitSurvey = function(href) {
            resultSection.classList.add('hidden');

            setTimeout(function() {
                outtroSection.classList.remove('hidden');
                }, 1000)

            exportCSV();

        };


        // Navigation – go forward.

        buttonNext.onclick = function() {
            const currentItem       = document.querySelector('#survey-1 .in-content:not(.hidden)');
            const currentNav        = document.querySelector('#navBar .navtext:not(.navdimmed)');

            if (currentItem) {
                // Find the next sibling list item
                const nextItem      = currentItem.nextElementSibling;
                const nextNav       = currentNav.nextElementSibling;
    
                // If a next item exists, switch visibility otherwise go to results.
                if (nextItem) {
                    currentItem.classList.add('hidden');
                    currentNav.classList.add('navdimmed');
                    setTimeout(function() {
                        nextItem.classList.remove('hidden');
                        nextNav.classList.remove('navdimmed');
                    }, 800)
                } else {
                    surveySection.classList.add('hidden');

                    setTimeout(function() {
                        resultSection.classList.remove('hidden');
                        }, 1000)

                    outputDIV();
                }
            }
        };


        // Navigation – go backward.

        buttonPrev.onclick = function() {
            const currentItem       = document.querySelector('#survey-1 .in-content:not(.hidden)');
            const currentNav        = document.querySelector('#navBar .navtext:not(.navdimmed)');
  
            if (currentItem) {
                // Find the next sibling list item.
                const prevItem      = currentItem.previousElementSibling;
                const prevNav       = currentNav.previousElementSibling;
    
                // If a previous item exists, switch visibility otherwise return to intro.
                if (prevItem) {
                    currentItem.classList.add('hidden');
                    currentNav.classList.add('navdimmed');

                    setTimeout(function() {
                        prevItem.classList.remove('hidden');
                        prevNav.classList.remove('navdimmed');
                    }, 800)
                } else {
                    surveySection.classList.add('hidden');

                    setTimeout(function() {
                        introSection.classList.remove('hidden');
                        }, 1000)
                }
            }
        };




/*-- SURVEY RESULTS --------------------------------------*/

    
    function outputDIV() {

        /* Definitions */

            // Setup

            const surveyN1          = document.getElementById('survey-1');
            const formDataN1        = new FormData(surveyN1);
            const dataN1            = Object.fromEntries(formDataN1.entries());

            // Titles

            const q1Title           = document.getElementById('q1-title').textContent;
            const q2Title           = document.getElementById('q2-title').textContent;
            const q3Title           = document.getElementById('q3-title').textContent;
            const q4Title           = document.getElementById('q4-title').textContent;


            // Prompts

            const q1Prompt          = document.getElementById('q1-prompt').textContent;
            const q2Prompt          = document.getElementById('q2-prompt').textContent;
            const q3Prompt          = document.getElementById('q3-prompt').textContent;
            const q4Prompt          = document.getElementById('q4-prompt').textContent;


            // Answers – replace 'undefined' with set text.

            const noText            = `<span style="color: red;"><i>no response</i></span>`;


            if (dataN1["Q1"]) {
                var q1Answer = dataN1["Q1"];
                } else {
                var q1Answer = noText;
                }


            if (dataN1["Q2"]) {
                var q2Answer = dataN1["Q2"];
                } else {
                var q2Answer = noText;
                }


            if (dataN1["Q3"]) {
                var q3Answer = dataN1["Q3"];
                } else {
                var q3Answer = noText;
                }


            if (dataN1["Q4"]) {
                var q4Answer = dataN1["Q4"];
                } else {
                var q4Answer = noText;
                }


            // Output

            var surveyOutput       = document.getElementById('survey-output');


        /* Actions */

            surveyOutput.innerHTML = `
                <span class="minititle">
                    ${q1Title}
                </span>

                <span class="smalltext bolded">
                    ${q1Prompt}
                </span><br>

                <span class="smalltext">
                    → ${q1Answer}
                </span> <br><br><br>


                <span class="minititle">
                    ${q2Title}
                </span>

                <span class="smalltext bolded">
                    ${q2Prompt}
                </span> <br>

                <span class="smalltext">
                    → ${q2Answer}
                </span> <br><br><br>


                <span class="minititle">
                    ${q3Title}
                </span>

                <span class="smalltext bolded">
                    ${q3Prompt}
                </span> <br>

                <span class="smalltext">
                    → ${q3Answer}
                </span> <br><br><br>


                <span class="minititle">
                    ${q4Title}
                </span>

                <span class="smalltext bolded">
                    ${q4Prompt}
                </span> <br>

                <span class="smalltext">
                    → ${q4Answer}
                </span> <br><br><br>

            `;

        };




/*-- SURVEY CSV EXPORT --------------------------------------*/


    function exportCSV() {

        /* Definitions */

            // Setup

            const surveyN1          = document.getElementById('survey-1');
            const formDataN1        = new FormData(surveyN1);
            const data              = {};

        /* Actions */

            // Collect form inputs.

            for (const [key, value] of formDataN1.entries()) {

                if (data[key]) {
                    // Combine multiple selections into one cell.
                    data[key] += `; ${value}`;
                } else {
                    data[key] = `${value}`;
                }
            }


            // Escape values with quotes, commas, new lines.

            const escapedCSV = (val) => {
            
                const str           = String(val ?? '');
    
                if (/[",\r\n]/.test(str)) {
                    return `"${str.replace(/"/g, '""')}"`;
                }

                return str;
            };


            // Build CSV headers and rows.

            const headers       = Object.keys(data).map(escapedCSV).join(',');
            const row           = Object.values(data).map(escapedCSV).join(',');


            // Get date and time.

            const d = new Date();
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const time = d.toLocaleTimeString();

            const csvDate = `${mm}/${dd}/${yyyy} — ${time}`;


            // Generate ID number.

            const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
            const letter1 = alphabet[Math.floor(Math.random() * alphabet.length)];
            const letter2 = alphabet[Math.floor(Math.random() * alphabet.length)];

            const hrs = d.getHours();
            const min = d.getMinutes();
            const sec = d.getSeconds();

            const csvID   = `${letter1}${letter2}${hrs}${min}-${sec}`;


            // Format CSV content.

            const csvContent = `projectWHY – Survey N1\n\nDate: ${csvDate}\nID: ${csvID}\n\n${headers}\n${row}`;


            // Create blob.

            const blob          = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const url           = URL.createObjectURL(blob);


            // Trigger download

            const link          = document.createElement('a');
            
            link.href = url;
            link.download = `N1_${csvID}.csv`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
    }








