

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
    $('#exampleModalLabel').html('Chocalho do samba');
    var dados = "%%MIDI drummap A 82  \n %Shaker" +
            "%%MIDI beat a b c n"+
            "%%MIDI beataccents"+
            "%%MIDI beatstring ppfpppfp" +
            "%%score (V0)\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "Q:1/4=80\n" +
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
    var dados = "M: 2/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
            "L: 1/16\n" +
            "|: !>!AAA!>!A AA!>!AA | AA!>!AA A!>!AAA :|";
    render(dados);
    e.preventDefault();
});

$('a.recoreco-congo').click(function (e)
{
    $('#exampleModalLabel').html('Casaca do congo');
    var dados = "M: 2/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "L: 1/16\n" +
            "|: A2!>!AA A2!>!AA :|";
    render(dados);
    e.preventDefault();
});

$('a.recoreco-frevo').click(function (e)
{
    $('#exampleModalLabel').html('Reco-reco do frevo');
    var dados = "M: 2/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
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
            "Q:1/4=130\n" +
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
    var dados = "M: 4/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "L: 1/16\n" +
            "|: {/F}F2 |z2F2 z2F2 :|";
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