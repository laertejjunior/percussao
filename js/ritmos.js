

function load() {

}

$('a.agogo-maracatu').click(function (e)
{


    $('#exampleModalLabel').html('Agogô do maracatú');
    var agogoMaracatu = "M: 4/4\n" +
            "Q:1/4=100\n"+
            "V:V0 clef=perc stafflines=1\n"+
            "%%voicemap percussion\n" +
            "%%MIDI channel 10\n" + 
            "%%MIDI program 222\n" + 
            "L: 1/8\n" +
            "|: ^G=G^G=G ^G/=G=G/ ^G=G:|";


    ABCJS.renderAbc("paper", agogoMaracatu);
    ABCJS.renderMidi("midi", agogoMaracatu);
    
    $('#exibePartitura').modal('show');
    e.preventDefault();
});


$('a.agogo-samba').click(function (e)
{


    $('#exampleModalLabel').html('Agogô do samba');
    var agogoMaracatu = "M: 4/4\n" +
            "L: 1/8\n" +
            "|:DEDE D/EE/ DE:|";


    ABCJS.renderAbc("paper", agogoMaracatu);
    ABCJS.renderMidi("midi", agogoMaracatu);
    ABCJS.renderMidi("midi-download", agogoMaracatu, {generateDownload: true, generateInline: false});

    $('#exibePartitura').modal('show');
    e.preventDefault();
});

$('a.agogo-xote').click(function (e)
{


    $('#exampleModalLabel').html('Agogô do xote');
    var agogoMaracatu = "M: 4/4\n" +
            "L: 1/8\n" +
            "|:DEDE D/EE/ DE:|";


    ABCJS.renderAbc("paper", agogoMaracatu);
    ABCJS.renderMidi("midi", agogoMaracatu);
    ABCJS.renderMidi("midi-download", agogoMaracatu, {generateDownload: true, generateInline: false});

    $('#exibePartitura').modal('show');
    e.preventDefault();
});

$('a.agogo-baiao').click(function (e)
{


    $('#exampleModalLabel').html('Agogô do baião');
    var agogoMaracatu = "M: 4/4\n" +
            "L: 1/8\n" +
            "|:DEDE D/EE/ DE:|";


    ABCJS.renderAbc("paper", agogoMaracatu);
    ABCJS.renderMidi("midi", agogoMaracatu);
    ABCJS.renderMidi("midi-download", agogoMaracatu, {generateDownload: true, generateInline: false});

    $('#exibePartitura').modal('show');
    e.preventDefault();
});

$('a.agogo-funk').click(function (e)
{


    $('#exampleModalLabel').html('Agogô do funk carioca');
    var agogoMaracatu = "M: 4/4\n" +
            "L: 1/8\n" +
            "|:DEDE D/EE/ DE:|";


    ABCJS.renderAbc("paper", agogoMaracatu);
    ABCJS.renderMidi("midi", agogoMaracatu);
    ABCJS.renderMidi("midi-download", agogoMaracatu, {generateDownload: true, generateInline: false});

    $('#exibePartitura').modal('show');
    e.preventDefault();
});

$('a.agogo-ijexa').click(function (e)
{


    $('#exampleModalLabel').html('Agogô do ijexá');
    var agogoMaracatu = "M: 4/4\n" +
            "L: 1/8\n" +
            "|:DEDE D/EE/ DE:|";


    ABCJS.renderAbc("paper", agogoMaracatu);
    ABCJS.renderMidi("midi", agogoMaracatu);
    ABCJS.renderMidi("midi-download", agogoMaracatu, {generateDownload: true, generateInline: false});

    $('#exibePartitura').modal('show');
    e.preventDefault();
});


$('a.surdo-clique').click(function (e)
{
    load();
    $('#exampleModal').modal('show');
    e.preventDefault();
});