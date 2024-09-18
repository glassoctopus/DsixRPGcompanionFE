const names = [
  // First 100 names
  'Zorak Kenobi', 'Lira Vane', 'Mendo Stark', 'Tila Tarken', 'Ruvon Kryze', 'Zeth Rendar', 'Pax Skywalker', 'Sova Fett', 'Nym Organa',
  'Jorra Rex', 'Myla Durron', 'Valis Windrider', 'Ren Cor', 'Xara Solo', 'Kelba Katarn', 'Kyra Vos', 'Fen Vizla', 'Aris Koon', 'Talon Droma',
  'Brez Fenn', 'Vyn Korr', 'Zara Durron', 'Rayn Sabine', 'Korl Vade', 'Seli Tano', 'Zul Starkiller', 'Orin Nida', 'Drenn Val', 'Rhea Kreel',
  'Tiber Skywalker', 'Zura Ventress', 'Lex Ozzel', 'Myrr Jarrus', 'Sorn Kanan', 'Tia Jade', 'Vek Starfire', 'Maris Traya', 'Torr Wren',
  'Lana Fett', 'Zaro Krennic', 'Iko Rook', 'Tal Kestis', 'Sorin Ren', 'Zila Antilles', 'Venn Tark', 'Mylo Fenn', 'Nira Dray', 'Xan Kryze',
  'Prax Vale', 'Sori Shaak', 'Brex Voss', 'Jira Ordo', 'Xen Typho', 'Orrin Veers', 'Lyra Koth', 'Reyna Dooku', 'Nex Stark', 'Kira Zann',
  'Fenn Vos', 'Tora Durron', 'Voss Kanin', 'Lira Antilles', 'Zan Val', 'Jax Nyr', 'Rala Katarn', 'Nex Skywalker', 'Vera Kryze', 'Sano Jade',
  'Vix Veers', 'Zylo Sabine', 'Talon Cor', 'Jorin Vizla', 'Myra Thrawn', 'Kyra Rendar', 'Toma Karr', 'Zeth Windu', 'Suri Organa', 'Xera Tano',
  'Kren Stark', 'Rylo Fett', 'Vek Starkiller', 'Zyra Wren', 'Lira Jade', 'Mara Kreel', 'Voss Tano', 'Xan Vizla', 'Ren Kestis', 'Drex Rendar',
  'Torr Stark', 'Mira Tano', 'Rex Katarn', 'Prax Windu', 'Jira Krennic', 'Tala Starkiller', 'Zira Val', 'Bren Vos', 'Xara Kreel', 'Dara Voss',

  // Second 100 names
  'Sarin Tark', 'Kylo Stark', 'Zarin Vos', 'Reyla Ventress', 'Varan Skywalker', 'Tira Kryze', 'Kel Val', 'Vero Droma', 'Rynn Korr',
  'Zoren Antilles', 'Jari Tarkin', 'Bela Wren', 'Sorin Starkiller', 'Kylo Veers', 'Lyra Tano', 'Nira Vizla', 'Myra Ren', 'Jaro Zann',
  'Taran Kestis', 'Vala Tano', 'Ryno Katarn', 'Sarin Kreel', 'Zola Tano', 'Zenn Kryze', 'Mira Skywalker', 'Kyra Droma', 'Varr Stark',
  'Lex Korr', 'Rey Val', 'Drex Krennic', 'Prax Kryze', 'Lorna Wren', 'Jara Rendar', 'Myla Sabine', 'Tana Vizla', 'Nex Dooku', 'Zylo Vos',
  'Vega Korr', 'Rayna Antilles', 'Kira Skywalker', 'Tyra Ventress', 'Lira Starkiller', 'Vinn Kestis', 'Soran Zann', 'Bex Vos', 'Fenn Kryze',
  'Zara Skywalker', 'Kyro Dooku', 'Tera Vizla', 'Jax Krennic', 'Nyla Droma', 'Mira Korr', 'Torr Ren', 'Jari Katarn', 'Lex Wren', 'Vyna Vos',
  'Dara Starkiller', 'Zanna Kryze', 'Rayn Tarkin', 'Siri Skywalker', 'Renn Droma', 'Sorin Stark', 'Tira Korr', 'Zari Tano', 'Jera Ventress',
  'Kira Kryze', 'Vera Skywalker', 'Zorren Vos', 'Lexa Katarn', 'Vira Wren', 'Torr Kreel', 'Rayna Stark', 'Zyra Kryze', 'Darin Tano', 'Pax Skywalker',
  'Lina Vizla', 'Torr Zann', 'Kyra Stark', 'Lyna Vos', 'Zaro Skywalker', 'Soren Ren', 'Benn Kryze', 'Sori Kestis', 'Nila Starkiller', 'Tora Antilles',
  'Zara Kryze', 'Kyro Vizla', 'Dara Ren', 'Rayna Kryze', 'Lora Zann', 'Vex Starkiller', 'Siri Kryze', 'Ryna Tano', 'Jara Skywalker', 'Viro Vos',
  'Darin Ventress', 'Tira Kryze', 'Lex Skywalker', 'Siri Starkiller', 'Lira Katarn', 'Zaro Kryze', 'Mira Vos', 'Tarin Wren', 'Zyra Ventress',

  // Third 100 names
  'Rex Starkiller', 'Nyna Kryze', 'Vara Stark', 'Pax Stark', 'Niro Katarn', 'Sera Ren', 'Bryn Korr', 'Zara Kestis', 'Lex Ventress',
  'Tarr Krennic', 'Korin Kryze', 'Tala Vos', 'Jira Skywalker', 'Lina Wren', 'Dari Kryze', 'Rex Wren', 'Sarin Skywalker', 'Tyr Stark',
  'Jora Ventress', 'Lexa Korr', 'Bren Starkiller', 'Nara Vos', 'Sera Tarkin', 'Tylo Wren', 'Vala Kryze', 'Nira Stark', 'Zanna Wren',
  'Kylo Droma', 'Lyna Ventress', 'Tira Stark', 'Dari Skywalker', 'Sera Vos', 'Reyla Kryze', 'Niro Starkiller', 'Vira Kryze', 'Kira Ventress',
  'Zyla Wren', 'Pax Wren', 'Rayna Ventress', 'Lexa Kryze', 'Nira Ventress', 'Torr Kryze', 'Vela Stark', 'Darin Vos', 'Kyra Starkiller',
  'Rory Katarn', 'Siri Kryze', 'Jira Stark', 'Torr Starkiller', 'Saran Kryze', 'Rena Ventress', 'Zorren Stark', 'Bren Wren', 'Kylo Vos',
  'Lexa Starkiller', 'Torr Vos', 'Bryn Ventress', 'Lira Kryze', 'Renn Starkiller', 'Siri Ventress', 'Torr Korr', 'Nira Stark', 'Jira Wren',
  'Sorin Katarn', 'Darin Stark', 'Lex Ventress', 'Zyla Vos', 'Pax Starkiller', 'Rynn Stark', 'Siri Korr', 'Torr Ventress', 'Ryna Stark',
  'Vala Starkiller', 'Zari Stark', 'Lexa Kryze', 'Kyra Wren', 'Tarin Kryze', 'Sari Starkiller', 'Lex Wren', 'Rayn Kryze', 'Darin Skywalker',
  'Torr Stark', 'Vira Starkiller', 'Sari Korr', 'Zori Vos', 'Kylo Wren', 'Bren Stark', 'Siri Stark', 'Pax Stark', 'Lex Kryze', 'Kyro Kryze',
  'Darin Wren', 'Lexa Wren', 'Torr Kryze', 'Bren Ventress', 'Zyra Starkiller', 'Rayn Wren', 'Siri Kryze', 'Kyra Stark', 'Vira Ventress',
  'Lexa Skywalker', 'Pax Ventress', 'Bren Kryze', 'Zori Wren', 'Lex Stark', 'Kyra Korr', 'Tarr Vos', 'Dari Ventress', 'Zora Stark', 'Vira Stark',

  // Set of 100 more names
  'Vorin Skystrider', 'Calyx Dray', 'Seren Jax', 'Tyle Voss', 'Dax Corvin', 'Reyva Torin', 'Jaris Thorne', 'Liora Kade', 'Vera Krynn',
  'Galen Antilles', 'Zane Kreel', 'Tylo Fenn', 'Dorra Korr', 'Seth Kade', 'Lysan Tov', 'Zerik Krenn', 'Thren Starkiller', 'Jarren Vos',
  'Kira Sorn', 'Syra Kenobi', 'Koss Rendar', 'Xela Kryze', 'Zorin Thayne', 'Lirra Kryze', 'Tessa Varr', 'Bren Vade', 'Viera Tark',
  'Renn Antilles', 'Jira Taan', 'Sorren Vale', 'Vyle Ordo', 'Kira Ventor', 'Jax Rendar', 'Mira Stark', 'Tarin Vox', 'Kel Ordo',
  'Lura Kade', 'Tannis Kreel', 'Xara Vos', 'Tala Dray', 'Zira Ventor', 'Soren Krynn', 'Milo Korr', 'Rylo Voss', 'Kyra Starkiller',
  'Zulon Thorne', 'Pera Vos', 'Kel Stark', 'Vyn Krynn', 'Sora Ventress', 'Talon Fenn', 'Zyla Durron', 'Jarek Val', 'Vera Kryze',
  'Mylo Kreel', 'Zora Taan', 'Koss Katarn', 'Seris Vos', 'Tyle Stark', 'Rilo Antilles', 'Zan Korr', 'Taryn Ventor', 'Lira Vos',
  'Dara Tarken', 'Reeva Kryze', 'Bryn Ventor', 'Mylo Thorne', 'Zyla Val', 'Pax Kade', 'Kora Vade', 'Lex Skystrider', 'Bren Krynn',
  'Xenn Kade', 'Tera Vos', 'Renna Starkiller', 'Sorren Kreel', 'Tess Korr', 'Drex Vade', 'Lyra Dorr', 'Rynn Thorne', 'Voss Antilles',
  'Kylo Stark', 'Talon Ventor', 'Ziri Vos', 'Tyra Korr', 'Sorin Kryze', 'Pax Starkiller', 'Tayla Krynn', 'Zek Stark', 'Liora Kreel',
  'Syla Voss', 'Miro Antilles', 'Reyna Kryze', 'Taron Kreel', 'Vyn Starkiller', 'Dorin Vos', 'Pera Durron', 'Zorrin Krynn', 'Tali Skystrider',
  'Rynn Val', 'Saris Krynn', 'Xalen Kryze', 'Bren Stark', 'Jira Kreel', 'Lira Ventor',

  // Set of another 100 names
  'Nylo Skystrider', 'Tyra Durron', 'Zoryn Korr', 'Kass Val', 'Tess Krynn', 'Lys Stark', 'Vorna Ventor', 'Ryka Kreel', 'Seris Starkiller',
  'Mira Fenn', 'Jarek Vos', 'Kel Starkiller', 'Bryn Taan', 'Thara Voss', 'Kass Kryze', 'Zaren Kade', 'Vera Thorne', 'Tess Antilles',
  'Pax Krynn', 'Zirra Korr', 'Zarek Vos', 'Lyra Kreel', 'Seris Kade', 'Ryen Starkiller', 'Mara Voss', 'Vonn Stark', 'Sori Ventor',
  'Kelra Krynn', 'Jaris Thorne', 'Vex Vos', 'Lyna Kade', 'Bren Korr', 'Xara Krynn', 'Virek Thorne', 'Zyra Durron', 'Soren Val',
  'Kara Kryze', 'Zylo Krynn', 'Lex Stark', 'Jax Vade', 'Talon Kreel', 'Nira Vos', 'Tann Val', 'Bryn Ventor', 'Taryn Krynn', 'Ryn Fenn',
  'Karis Skystrider', 'Zoren Kryze', 'Myra Val', 'Veyra Taan', 'Zira Stark', 'Tyla Kade', 'Xenn Kreel', 'Seris Durron', 'Siri Ventor',
  'Jorra Vos', 'Rynn Stark', 'Brenn Krynn', 'Zale Kryze', 'Reyna Thorne', 'Talon Korr', 'Lex Ventor', 'Dara Kade', 'Sori Fenn',
  'Zana Kreel', 'Tylon Vos', 'Mara Ventor', 'Bren Val', 'Vella Stark', 'Xela Korr', 'Perrin Krynn', 'Zira Starkiller', 'Saris Kreel',
  'Tess Val', 'Jax Krynn', 'Vyle Stark', 'Zarek Ventor', 'Taron Kryze', 'Milo Vos', 'Vynn Fenn', 'Tess Stark', 'Serra Kade',
  'Lira Fenn', 'Dara Val', 'Korrin Kryze', 'Tylon Kreel', 'Nira Starkiller', 'Xaren Krynn', 'Tess Durron', 'Vyle Ventor', 'Sorren Fenn',
  'Lex Kryze', 'Karis Vos', 'Voss Taan', 'Talon Starkiller', 'Zyra Ventor', 'Talon Krynn', 'Xyla Val', 'Karr Voss', 'Seren Fenn',
  'Kara Stark', 'Perrin Krynn', 'Tess Kreel', 'Nila Vade', 'Zoren Kade',

  // Set of another 100 names
  'Zayla Fenn', 'Talon Kryze', 'Dari Korr', 'Zerek Krynn', 'Lyra Val', 'Talon Ventor', 'Lex Vos', 'Renn Starkiller', 'Serra Thorne',
  'Taryn Kade', 'Bryn Ventor', 'Ryn Val', 'Serra Krynn', 'Zorren Vos', 'Vyla Kryze', 'Nylo Fenn', 'Korran Kade', 'Lex Ventor',
  'Zinn Vos', 'Varyn Stark', 'Taran Krynn', 'Bren Val', 'Nira Stark', 'Zane Kryze', 'Kirin Stark', 'Torr Kreel', 'Saris Ventor',
  'Brenn Krynn', 'Talen Starkiller', 'Jorra Korr', 'Zul Krynn', 'Lysa Vos', 'Tess Ventor', 'Xylan Fenn', 'Pax Stark', 'Zira Kryze',
  'Varyn Vos', 'Kira Ventor', 'Jax Kreel', 'Tessa Starkiller', 'Voss Krynn', 'Seth Kreel', 'Dax Ventor', 'Lex Val', 'Talon Stark',
  'Verrin Kryze', 'Taron Krynn', 'Sorin Ventor', 'Vira Starkiller', 'Lex Stark', 'Torr Val', 'Ryn Vos', 'Pax Fenn', 'Tess Krynn',
  'Zaryn Stark', 'Dara Kreel', 'Vyle Starkiller', 'Tyla Val', 'Renn Vos', 'Seren Stark', 'Jax Stark', 'Zalen Fenn', 'Dax Kade',
  'Nara Vos', 'Zane Starkiller', 'Vira Kreel', 'Kess Krynn', 'Soren Stark', 'Tarran Vos', 'Xela Stark', 'Vara Ventor', 'Tara Kade',
  'Lina Fenn', 'Jora Stark', 'Zarin Krynn', 'Lexa Kreel', 'Korrin Fenn', 'Voss Kade', 'Ziren Stark', 'Darin Val', 'Seth Kryze',
  'Zaren Vos', 'Vyn Stark', 'Jorra Krynn', 'Lex Starkiller', 'Kess Val', 'Seth Kade', 'Dax Krynn', 'Vyn Val', 'Talon Kreel',
  'Zane Krynn', 'Siri Kreel', 'Torr Vos', 'Jax Kryze', 'Voss Stark', 'Dara Ventor', 'Lexa Fenn', 'Vira Val', 'Xalen Krynn', 'Seth Ventor',
  'Kira Fenn', 'Tala Stark', 'Zane Vos', 'Vyla Krynn', 'Sori Stark',

  // Set of another 100 names
  'Korin Val', 'Bren Ventor', 'Tara Kreel', 'Zal Kade', 'Kess Vos', 'Vyla Fenn', 'Jira Krynn', 'Renn Kreel', 'Zale Krynn', 'Varyn Fenn',
  'Dara Kryze', 'Siri Vos', 'Zorrin Stark', 'Tess Kryze', 'Vala Val', 'Jorra Ventor', 'Kira Krynn', 'Vex Starkiller', 'Zyra Kade',
  'Darra Vos', 'Vora Kreel', 'Tara Krynn', 'Zalen Kryze', 'Jarra Ventor', 'Talon Starkiller', 'Vynn Fenn', 'Tess Kreel', 'Lex Val',
  'Renn Stark', 'Korr Vos', 'Zare Fenn', 'Lex Kreel', 'Voss Krynn', 'Siri Krynn', 'Dax Stark', 'Jora Vos', 'Virek Kreel', 'Taron Krynn',
  'Vynn Stark', 'Dorr Krynn', 'Lexa Kreel', 'Seth Fenn', 'Zane Vos', 'Talon Kreel', 'Vora Stark', 'Pax Krynn', 'Sorin Stark', 'Taron Vos',
  'Bren Starkiller', 'Dax Fenn', 'Jora Kryze', 'Virek Val', 'Sorin Vos', 'Tala Kreel', 'Vyla Stark', 'Zora Kryze', 'Kass Ventor',
  'Lex Stark', 'Vorr Vos', 'Taron Fenn', 'Brenn Krynn', 'Siri Ventor', 'Zal Starkiller', 'Vira Kade', 'Zale Krynn', 'Tarran Stark',
  'Vara Stark', 'Kess Vos', 'Zul Kreel', 'Darr Krynn', 'Lexa Val', 'Vora Starkiller', 'Perrin Vos', 'Tara Krynn', 'Sorin Stark',
  'Korr Val', 'Zar Fenn', 'Lex Krynn', 'Darr Vos', 'Vyla Starkiller', 'Siri Kade', 'Jora Fenn', 'Lexa Krynn', 'Taron Kreel', 'Vyn Vos',
  'Kess Stark', 'Zinn Kreel', 'Talon Fenn', 'Lexa Ventor', 'Vira Stark', 'Seth Stark', 'Zane Kryze', 'Seth Val', 'Tess Stark', 'Dax Vos',
  'Jora Kreel', 'Zane Ventor', 'Vex Stark', 'Pax Vos', 'Talon Krynn', 'Korin Starkiller',

  // Set of another 100 names
  'Sorin Kryze', 'Lexa Vos', 'Zaren Stark', 'Talon Ventor', 'Zalen Krynn', 'Vira Val', 'Kass Fenn', 'Darra Stark', 'Siri Kade',
  'Zora Krynn', 'Voss Vos', 'Sorin Fenn', 'Darr Ventor', 'Kira Stark', 'Lex Kreel', 'Zul Val', 'Sarin Vos', 'Tarran Krynn', 'Lexa Kryze',
  'Zal Stark', 'Jorra Fenn', 'Virek Vos', 'Tarran Kreel', 'Siri Stark', 'Darr Stark', 'Korin Kryze', 'Zora Kreel', 'Lexa Fenn',
  'Sorin Val', 'Dorr Vos', 'Vyla Ventor', 'Jara Kreel', 'Zalen Val', 'Tarran Fenn', 'Sorin Krynn', 'Vora Vos', 'Jarra Krynn', 'Zara Stark',
  'Darra Kryze', 'Voss Fenn', 'Lex Starkiller', 'Tara Kryze', 'Zyra Stark', 'Kass Vos', 'Vara Kreel', 'Jorra Vos', 'Dorr Kreel',
  'Zal Starkiller', 'Vira Krynn', 'Tarran Vos', 'Lexa Stark', 'Zul Kreel', 'Sorin Ventor', 'Lexa Krynn', 'Jarra Val', 'Zara Krynn',
  'Tarran Kreel', 'Siri Starkiller', 'Zor Vos', 'Voss Kryze', 'Dara Stark', 'Lexa Kreel', 'Zyra Krynn', 'Talon Stark', 'Darr Vos',
  'Zara Kryze', 'Korin Vos', 'Lex Ventor', 'Varyn Krynn', 'Jara Vos', 'Zoren Kreel', 'Tarran Val', 'Siri Kryze', 'Vara Fenn', 'Zalen Kryze',
  'Varyn Stark', 'Talon Kreel', 'Sorin Ventor', 'Lexa Starkiller', 'Tarran Kryze', 'Zara Vos', 'Voss Val', 'Kira Vos', 'Lex Fenn',
  'Zalen Ventor', 'Tarran Starkiller', 'Sarin Kreel', 'Jara Stark', 'Lexa Kryze', 'Zul Krynn', 'Tara Vos', 'Vyla Kryze', 'Zar Kreel',
  'Sarin Vos', 'Jorra Kryze', 'Tarran Stark', 'Zalen Starkiller', 'Lexa Kreel', 'Tara Stark', 'Voss Krynn', 'Zora Val', 'Dorr Stark',
];

const randomName = () => names[Math.floor(Math.random() * names.length)];

export default randomName;
