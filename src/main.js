import $ from 'jquery';
import 'bootstrap';
import './styles/styles.scss';
import 'bootstrap/scss/bootstrap.scss';


// Wacht tot het hele document geladen is (jQuery shorthand voor $(document).ready)
$(function() {

    // Selecteer alle elementen met role="tab" (de tab-knoppen)
    var $tabs = $('[role="tab"]');
    // Selecteer alle elementen met role="tabpanel" (de inhoudspanels)
    var $panels = $('[role="tabpanel"]');

    // Functie om een tab te activeren op basis van het indexnummer
    function activeerTab(index) {
        // Loop door alle tabs heen
        $tabs.each(function(i) {
            // Bepaal of deze tab de actieve is
            var actief = (i === index);

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
        var idx = $tabs.index(this);
        // Activeer de juiste tab en bijbehorende panel
        activeerTab(idx);
    });

    // Keyboard support voor de tabs
    $tabs.on('keydown', function(e) {
        // Bepaal de index van de tab waar je nu op staat
        var idx = $tabs.index(this);

        // Rechter pijltje: ga naar de volgende tab
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            var volgende = (idx + 1) % $tabs.length; // Volgende tab, rond als je aan het eind bent
            $tabs.eq(volgende).focus();
        }
        // Linker pijltje: ga naar de vorige tab
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            var vorige = (idx - 1 + $tabs.length) % $tabs.length; // Vorige tab, rond als je aan het begin bent
            $tabs.eq(vorige).focus();
        }
        // Home-toets: ga naar de eerste tab
        if (e.key === 'Home') {
            e.preventDefault();
            $tabs.eq(0).focus();
        }
        // End-toets: ga naar de laatste tab
        if (e.key === 'End') {
            e.preventDefault();
            $tabs.eq($tabs.length - 1).focus();
        }
        // Enter of spatie: activeer de tab waar je nu op staat
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activeerTab(idx);
        }
    });
});

//melding dat je bent aangemeld
$('#aanmelden').on('submit', function(e) {
    e.preventDefault(); // voorkomt daadwerkelijk versturen
    var data = $(this).serializeArray();
    localStorage.setItem('formulierGegevens', JSON.stringify(data));
    $('#melding').fadeIn(); // Laat de melding zien
});