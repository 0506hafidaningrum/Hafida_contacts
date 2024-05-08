const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add', 
    describe: 'Menambahkan contact baru' ,
    builder : {
        nama: {
            describe: 'Nama lengkap',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'srting',
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    }, 
})
.demandCommand();

// menampilkan daftar semua nama contact
yargs.command({
    command: 'list', 
    describe: 'Menampilkan semua nama & no HP contact' ,
    handler() { 
        contacts.listContact();
    },
});

// menampilan detail sebuah contact
yargs.command({
    command: 'detail', 
    describe: 'Menampilkan detail sebuah contact berdasarkan nama' ,
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) { 
        contacts.detailContact(argv.nama);
    },
});

// menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete', 
    describe: 'Menghapus  sebuah contact berdasarkan nama' ,
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) { 
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();

//mengambil argumen dari commond line
// const commond = process.argv[2];
// if(commond === 'add') {}

// const contacts = require('./contacts');

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukkan nama anda :');
//     const email = await contacts.tulisPertanyaan('Masukkan email anda :');
//     const noHP = await contacts.tulisPertanyaan('Masukkan noHP anda :');

//     contacts.simpanContact(nama, email, noHP);
// };

// main();

