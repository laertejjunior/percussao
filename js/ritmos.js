

function load() {

}

$('a.agogo-maracatu').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do maracatú');
    var agogo = "M: 4/4\n" +
            "Q:1/4=100\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
            "L: 1/8\n" +
            "|: ^G=G ^G=G ^G/=G=G/ ^G=G:|";


    render(agogo);
    e.preventDefault();
});


$('a.agogo-samba').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do samba');
    var agogo = "M: 2/4\n" +
            "Q:1/4=100\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
            "L: 1/8\n" +
            "|: z/GG/ G^G/G/ |^G=G/G/ z/^GG/:|";

    render(agogo);
    e.preventDefault();
});

$('a.agogo-xote').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do xote');
    var agogo = "M: 2/4\n" +
            "Q:1/4=100\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
            "L: 1/8\n" +
            "|: G2^G2:|";


    render(agogo);
    e.preventDefault();
});

$('a.agogo-baiao').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do baião');
    var agogo = "M: 2/4\n" +
            "Q:1/4=100\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
            "L: 1/8\n" +
            "|: ^G2=G2:|";


    render(agogo);
    e.preventDefault();
});

$('a.agogo-funk').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do Funk carioca');
    var agogo = "M: 4/4\n" +
            "Q:1/4=100\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
            "L: 1/16\n" +
            "|: ^G3=G z2 G2 ^G2G2 =G3^G:|";


    render(agogo);
    e.preventDefault();
});

$('a.agogo-ijexa').click(function (e)
{
    $('#exampleModalLabel').html('Agogô do Ijexá');
    var agogo = "M: 2/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
            "L: 1/16\n" +
            "|: ^GG2=G z GG2 | ^G2G2 =G2G2:|";


    render(agogo);
    e.preventDefault();
});

$('a.chocalho-samba').click(function (e)
{
    $('#exampleModalLabel').html('Chocalho do samba');
    var dados = "M: 2/4\n" +
            "Q:1/4=80\n" +
            "V:V0 clef=perc stafflines=1\n" +
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" +
            "%%MIDI program 222\n" +
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




$('a.surdo-clique').click(function (e)
{
    load();
    $('#exampleModal').modal('show');
    e.preventDefault();
});


function render(celula) {
    ABCJS.renderAbc("paper", celula);
    ABCJS.renderMidi("midi", celula);

    $('#exibePartitura').modal('show');
}