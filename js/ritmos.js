

function load() {

}

$('a.agogo-maracatu').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do maracatú');
    var agogo = "%%MIDI drummap A   68\n" +
            "%%MIDI drummap B   67\n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 4/4\n" +
            "K:C perc\n" +
            "L: 1/8\n" +
            "|: AB AB A/BB/ AB:|";

    render(agogo);
    e.preventDefault();
});


$('a.agogo-samba').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do samba');
    var agogo = "%%MIDI drummap A   68\n" +
            "%%MIDI drummap B   67\n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 2/4\n" +
            "K:C perc\n" +
            "L: 1/8\n" +
            "|: z/BB/ BA/A/ |AB/B/ z/AA/:|";

    render(agogo);
    e.preventDefault();
});

$('a.agogo-xote').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do xote');
    var agogo = "%%MIDI drummap A   68\n" +
            "%%MIDI drummap B   67\n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "M: 2/4\n" +
            "Q:1/4=100\n" +
            "K:C perc\n" +
            "L: 1/8\n" +
            "|: B2A2:|";
    render(agogo);
    e.preventDefault();
});

$('a.agogo-baiao').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do baião');
    var agogo = "%%MIDI drummap A   68\n" +
            "%%MIDI drummap B   67\n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "M: 2/4\n" +
            "Q:1/4=100\n" +
            "K:C perc\n" +
            "L: 1/8\n" +
            "|: A2B2:|";


    render(agogo);
    e.preventDefault();
});

$('a.agogo-funk').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do Funk carioca');
    var agogo = "%%MIDI drummap A   68\n" +
            "%%MIDI drummap B   67\n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "M: 4/4\n" +
            "Q:1/4=115\n" +
            "K:C perc\n" +
            "L: 1/16\n" +
            "|: A3B z2 B2 A2A2 B3A:|";


    render(agogo);
    e.preventDefault();
});

$('a.agogo-ijexa').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do Ijexá');
    var agogo = "%%MIDI drummap A   68\n" +
            "%%MIDI drummap B   67\n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=80\n" +
            "M: 2/4\n" +
            "K:C perc\n" +
            "L: 1/16\n" +
            "|: AA2B z BB2 | A2A2 B2B2:|";


    render(agogo);
    e.preventDefault();
});

$('a.chocalho-samba').click(function (e)
{
//    controls the way note velocities are selected. 
//    The first note in a bar has velocity a. Other "strong" notes have velocity b and 
//    all the rest have velocity c. a, b and c must be in the range 0-128. 
//    The parameter n determines which notes are "strong". 
//    If the time signature is x/y, then each note is given a position number k = 0, 1, 2 .. x-1 within each bar. 
//    Note that the units for n are not the unit note length. 
//    If k is a multiple of n, then the note is "strong". 
//    The volume specifiers !ppp! to !fff! are equivalent to the following : !ppp! = %%MIDI beat 30 20 10 1 
//!pp! = %%MIDI beat 45 35 20 1 
//!p! = %%MIDI beat 60 50 35 1 
//!mp! = %%MIDI beat 75 65 50 1 
//!mf! = %%MIDI beat 90 80 65 1 
//!f! = %%MIDI beat 105 95 80 1 
//!ff! = %%MIDI beat 120 110 95 1 
//!fff! = %%MIDI beat 127 125 110 1
    
    $('#exampleModalLabel').html('Chocalho do samba');
    var dados = "%%MIDI drummap A 82  \n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 2/4\n" +
            "K:C perc\n" +
            "L: 1/16\n" +
            "|: AA!>!AA AA!>!AA :|";


    render(dados);
    e.preventDefault();
});

$('a.recoreco-samba').click(function (e)
{
    $('#exampleModalLabel').html('Reco-reco do samba');
    var dados = "%%MIDI drummap A 74  \n" +
            "%%MIDI drummap B 74  \n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 2/4\n" +
            "K:C perc\n" +
            "L: 1/16\n" +
            "|: !>!BAA!>!B AA!>!BA | AA!>!BA A!>!BAA :|";
    render(dados);
    e.preventDefault();
});

$('a.recoreco-congo').click(function (e)
{
    $('#exampleModalLabel').html('Casaca do congo');
    var dados ="%%MIDI drummap A 74  \n" +
            "%%MIDI beat 20 20 64 20 \n"+
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 2/4\n" +
            "K:C perc\n" +
            "L: 1/16\n" +
            "|: A2!>!AA A2!>!AA  | A2!>!AA A2!>!AA :|";
    render(dados);
    e.preventDefault();
});

$('a.recoreco-frevo').click(function (e)
{
    $('#exampleModalLabel').html('Reco-reco do frevo');
    var dados = "%%MIDI drummap A 74  \n" +
            "%%MIDI beat 20 20 64 20 \n"+
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 2/4\n" +
            "K:C perc\n" +
            "L: 1/16\n" +
            "|: z2AA z2AA :|";
    render(dados);
    e.preventDefault();
});


$('a.repique-samba').click(function (e)
{
    $('#exampleModalLabel').html('Repique do samba');
    var dados = "%%MIDI drummap F 37\n" +
            "%%MIDI drummap A   66\n" +
            "%%MIDI drummap c   65\n" +
            "%%score (V0 V1)\n" +
            "Q:1/4=100\n" +
            "M: 2/4\n" +
            "L: 1/16\n" +
            "K:C perc\n" +
            "[V:V0]  AAc z AAc z :|\n" +
            "[V:V1]  z3  F z3  F :|";
    render(dados);
    e.preventDefault();
});


$('a.repique-axe').click(function (e)
{
    $('#exampleModalLabel').html('Repique do axé');
    var dados = "M: 4/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "L: 1/16\n" +
            "|: F3F z2 F2 z2 F2 z F3 :|";
    render(dados);
    e.preventDefault();
});

$('a.repique-sambareggae').click(function (e)
{
    $('#exampleModalLabel').html('Repique do samba reggae');
    var dados = "M: 4/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "L: 1/16\n" +
            "|:  z2 {/F}F2 z2 {/F}F2 z2 {/F}F2 (3 FFFF2  :|";
    render(dados);
    e.preventDefault();
});


$('a.repique-ijexa').click(function (e)
{
    $('#exampleModalLabel').html('Repique do ijexá');
    var dados = "M: 2/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "L: 1/16\n" +
            "|:  zF2F z2F2 |z2F2 z2F2 :|";
    render(dados);
    e.preventDefault();
});

$('a.tarol-maracatu').click(function (e)
{
    $('#exampleModalLabel').html('Tarol do maracatú');
    var dados = "%%MIDI drummap A   38\n" +
            "%%MIDI drummap B   67\n" +
            "%%MIDI beat 20 20 20 1 \n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 4/4\n" +
            "K:C perc\n" +
             "L: 1/16\n" +
            "|: !>!A/2A/2A/2A/2A/2A/2A A!>!AAA A!>!AAA A!>!AAA :|";
    render(dados);
    e.preventDefault();
});

$('a.tarol-samba').click(function (e)
{
    $('#exampleModalLabel').html('Tarol do samba');
    var dados = "%%MIDI drummap A 38  \n" +
            "%%MIDI beat 30 30 30 1 \n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=130\n" +
            "M: 2/4\n" +
            "K:C perc\n" +
            "L: 1/16\n" +
            "|: !>!AAA!>!A !>!AAA!>!A :|";
    render(dados);
    e.preventDefault();
});

$('a.caixa-guerra-maracatu').click(function (e)
{
    $('#exampleModalLabel').html('Caixa de guerra do maracatú');
    var dados = "%%MIDI drummap A   38\n" +
            "%%MIDI drummap B   67\n" +
            "%%MIDI beat 40 20 20 1 \n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 4/4\n" +
            "K:C perc\n" +
             "L: 1/16\n" +
            "|: AA2A !>!A2A2 AA2A   !>!A/2A/2A/2A/2A/2A/2A/2A/2 :|";
    render(dados);
    e.preventDefault();
});

$('a.alfaia-maracatu').click(function (e)
{
    $('#exampleModalLabel').html('Alfaia do maracatú');
    var dados = "%%MIDI drummap A   87\n" +
            "%%MIDI drummap B   86\n" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=100\n" +
            "M: 4/4\n" +
            "K:C perc\n" +
             "L: 1/16\n" +
            "|: !>!A4 B!>!A3 B!>!A3 B!>!A3 :|";
    render(dados);
    e.preventDefault();
});



function render(celula) {
    ABCJS.renderAbc("paper", celula);
    ABCJS.renderMidi("midi", celula);

    $('#exibePartitura').modal('show');
}

$('#exibePartitura').on('hidden.bs.modal', function () {
    ABCJS.midi.stopPlaying();
})