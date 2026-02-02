export interface NHLTeam {
  name: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  city: string;
  conference: 'Eastern' | 'Western';
  division: string;
}

export const nhlTeams: NHLTeam[] = [
  // Metropolitan Division (Eastern Conference)
  { name: 'Hurricanes', abbreviation: 'CAR', primaryColor: '#CC0000', secondaryColor: '#000000', city: 'Carolina', conference: 'Eastern', division: 'Metropolitan' },
  { name: 'Blue Jackets', abbreviation: 'CBJ', primaryColor: '#002654', secondaryColor: '#CE1126', city: 'Columbus', conference: 'Eastern', division: 'Metropolitan' },
  { name: 'Devils', abbreviation: 'NJD', primaryColor: '#CE1126', secondaryColor: '#000000', city: 'New Jersey', conference: 'Eastern', division: 'Metropolitan' },
  { name: 'Islanders', abbreviation: 'NYI', primaryColor: '#00539B', secondaryColor: '#F47D30', city: 'New York', conference: 'Eastern', division: 'Metropolitan' },
  { name: 'Rangers', abbreviation: 'NYR', primaryColor: '#0038A8', secondaryColor: '#CE1126', city: 'New York', conference: 'Eastern', division: 'Metropolitan' },
  { name: 'Flyers', abbreviation: 'PHI', primaryColor: '#F74902', secondaryColor: '#000000', city: 'Philadelphia', conference: 'Eastern', division: 'Metropolitan' },
  { name: 'Penguins', abbreviation: 'PIT', primaryColor: '#000000', secondaryColor: '#FCB514', city: 'Pittsburgh', conference: 'Eastern', division: 'Metropolitan' },
  { name: 'Capitals', abbreviation: 'WSH', primaryColor: '#C8102E', secondaryColor: '#041E42', city: 'Washington', conference: 'Eastern', division: 'Metropolitan' },

  // Atlantic Division (Eastern Conference)
  { name: 'Bruins', abbreviation: 'BOS', primaryColor: '#FFB81C', secondaryColor: '#000000', city: 'Boston', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Sabres', abbreviation: 'BUF', primaryColor: '#002654', secondaryColor: '#FCB514', city: 'Buffalo', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Red Wings', abbreviation: 'DET', primaryColor: '#CE1126', secondaryColor: '#FFFFFF', city: 'Detroit', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Panthers', abbreviation: 'FLA', primaryColor: '#C8102E', secondaryColor: '#041E42', city: 'Florida', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Canadiens', abbreviation: 'MTL', primaryColor: '#AF1E2D', secondaryColor: '#192168', city: 'Montreal', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Senators', abbreviation: 'OTT', primaryColor: '#C52032', secondaryColor: '#C2912C', city: 'Ottawa', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Lightning', abbreviation: 'TBL', primaryColor: '#002868', secondaryColor: '#FFFFFF', city: 'Tampa Bay', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Maple Leafs', abbreviation: 'TOR', primaryColor: '#00205B', secondaryColor: '#FFFFFF', city: 'Toronto', conference: 'Eastern', division: 'Atlantic' },

  // Central Division (Western Conference)
  { name: 'Coyotes', abbreviation: 'UTA', primaryColor: '#8C2633', secondaryColor: '#E2D6B5', city: 'Utah', conference: 'Western', division: 'Central' },
  { name: 'Blackhawks', abbreviation: 'CHI', primaryColor: '#CF0A2C', secondaryColor: '#000000', city: 'Chicago', conference: 'Western', division: 'Central' },
  { name: 'Avalanche', abbreviation: 'COL', primaryColor: '#6F263D', secondaryColor: '#236192', city: 'Colorado', conference: 'Western', division: 'Central' },
  { name: 'Stars', abbreviation: 'DAL', primaryColor: '#006847', secondaryColor: '#8F8F8C', city: 'Dallas', conference: 'Western', division: 'Central' },
  { name: 'Wild', abbreviation: 'MIN', primaryColor: '#154734', secondaryColor: '#A6192E', city: 'Minnesota', conference: 'Western', division: 'Central' },
  { name: 'Predators', abbreviation: 'NSH', primaryColor: '#FFB81C', secondaryColor: '#041E42', city: 'Nashville', conference: 'Western', division: 'Central' },
  { name: 'Blues', abbreviation: 'STL', primaryColor: '#002F87', secondaryColor: '#FCB514', city: 'St. Louis', conference: 'Western', division: 'Central' },
  { name: 'Jets', abbreviation: 'WPG', primaryColor: '#041E42', secondaryColor: '#004C97', city: 'Winnipeg', conference: 'Western', division: 'Central' },

  // Pacific Division (Western Conference)
  { name: 'Ducks', abbreviation: 'ANA', primaryColor: '#F47A38', secondaryColor: '#B9975B', city: 'Anaheim', conference: 'Western', division: 'Pacific' },
  { name: 'Flames', abbreviation: 'CGY', primaryColor: '#C8102E', secondaryColor: '#F1BE48', city: 'Calgary', conference: 'Western', division: 'Pacific' },
  { name: 'Oilers', abbreviation: 'EDM', primaryColor: '#041E42', secondaryColor: '#FF4C00', city: 'Edmonton', conference: 'Western', division: 'Pacific' },
  { name: 'Kings', abbreviation: 'LAK', primaryColor: '#111111', secondaryColor: '#A2AAAD', city: 'Los Angeles', conference: 'Western', division: 'Pacific' },
  { name: 'Sharks', abbreviation: 'SJS', primaryColor: '#006D75', secondaryColor: '#EA7200', city: 'San Jose', conference: 'Western', division: 'Pacific' },
  { name: 'Kraken', abbreviation: 'SEA', primaryColor: '#001628', secondaryColor: '#99D9D9', city: 'Seattle', conference: 'Western', division: 'Pacific' },
  { name: 'Canucks', abbreviation: 'VAN', primaryColor: '#00205B', secondaryColor: '#00843D', city: 'Vancouver', conference: 'Western', division: 'Pacific' },
  { name: 'Golden Knights', abbreviation: 'VGK', primaryColor: '#B4975A', secondaryColor: '#333F42', city: 'Vegas', conference: 'Western', division: 'Pacific' },
];

// Group teams by division for easier display
export const teamsByDivision = {
  Metropolitan: nhlTeams.filter(t => t.division === 'Metropolitan'),
  Atlantic: nhlTeams.filter(t => t.division === 'Atlantic'),
  Central: nhlTeams.filter(t => t.division === 'Central'),
  Pacific: nhlTeams.filter(t => t.division === 'Pacific'),
};

// Group teams by conference
export const teamsByConference = {
  Eastern: nhlTeams.filter(t => t.conference === 'Eastern'),
  Western: nhlTeams.filter(t => t.conference === 'Western'),
};
