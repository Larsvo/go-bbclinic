import $ from 'jquery';
import 'bootstrap';
import './styles/styles.scss';
import 'bootstrap/scss/bootstrap.scss';


//tabs van het "wie zijn wij" item
$(function() {
    // Selecteer alle elementen met role="tab" (de tab-knoppen)
    let $tabs = $('[role="tab"]');
    // Selecteer alle elementen met role="tabpanel" (de inhoudspanels)
    let $panels = $('[role="tabpanel"]');
    // Functie om een tab te activeren op basis van het indexnummer
    function activeerTab(index) {
        // Loop door alle tabs heen
        $tabs.each(function(i) {
            // Bepaal of deze tab de actieve is
            let actief = (i === index);
            // Zet ARIA-attributen en tabindex voor toegankelijkheid
            $(this)
                .attr('aria-selected', actief)      // Alleen de actieve tab krijgt aria-selected="true"
                .attr('tabindex', actief ? 0 : -1); // Alleen de actieve tab is bereikbaar met Tab
            // Toon of verberg het bijbehorende tabpanel
            $panels.eq(i).attr('hidden', !actief);
            // Geef focus aan de actieve tab (voor toetsenbordgebruikers)
            if (actief) {
                $(this).focus();
            }
        });
    }
    // Als je op een tab klikt, activeer die tab
    $tabs.on('click', function() {
        // Bepaal de index van de aangeklikte tab
        let idx = $tabs.index(this);
        // Activeer de juiste tab en bijbehorende panel
        activeerTab(idx);
    });

});

//melding dat je bent aangemeld formulier
$('#aanmelden').on('submit', function(e) {
    e.preventDefault(); // voorkomt daadwerkelijk versturen
    let data = $(this).serializeArray();
    localStorage.setItem('formulierGegevens', JSON.stringify(data));
    $('#melding').fadeIn(); // Laat de melding zien
});