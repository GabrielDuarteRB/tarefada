import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

type props = {
  id: number,
  weekName: string,
}

export default function CardWeek({ weekName, id } : props) {
  return (
    <Link href={`/tasks/week/${id}`} asChild>
      <Pressable style={styles.cardWeek}>
        <Text style={styles.cardWeekTitulo}>{weekName}</Text>

        <Image
          source={require('../../../assets/images/3-cards.png')}
          style={{ width: 215, height: 215, alignSelf: 'center' }}
        />
      </Pressable>
    </Link>

  );
}

const styles = StyleSheet.create({
  cardWeek: {
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#4C0B8C',
    height: 336,
    margin: 'auto',
    padding: 24,
    width: 240,
  },
  cardWeekTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }
})