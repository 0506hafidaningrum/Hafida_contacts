const fs = require('fs') ;
const chalk = require('chalk');
const validator = require('validator');
// menuliskan string ke file (synchronus)
// try {
// fs.writeFileSync('data/test.txt', 'Hello World secara synchronous!'); 
// } catch (e) {
//     console.log(e);
// }

// menuliskan string ke file (asynchronus)
// fs.writeFile('data/test.txt', 'Hello Worls secar Ansynchronus', (e) => {
//     console.log(e);
// });

// membaca isi file (synchronus)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca isi file (asynchronus)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// Readline
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    //   const file = fs.readFileSync('data/contacts.json', 'utf-8');
    //   const contacts = JSON.parse(file);
    const contacts = loadContact();

      // cek duplikat
      const duplikat = contacts.find((contact) => contact.nama === nama);
      if(duplikat) {
        console.log(chalk.red.inverse.bold(
            'Contact sudah terdaftar, gunakan nama lain!'));
        return false;
      }

      //cek email
      if(email) {
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold(
                'Email tidak valid!'));
            return false;
        }
      }  

      // cek no HP
      if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse.bold(
            'Nomor HP tidak valid!'));
        return false;
      }

      contacts.push(contact);

      fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

      console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data.'));
      
};


const listContact = () => {
 const contacts = loadContact();
 console.log(chalk.blue.inverse.bold('Daftar Kontak : '));
 contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
 });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHP);
    if (contact.email) {
        console.log(contact.email);
    }
};


const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts= contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
);

if(contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
}

fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

console.log(
    chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus!`));

};


module.exports = {simpanContact, listContact, detailContact, deleteContact};