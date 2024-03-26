package pokedex.pxt.mbo.pokedex.entity.pokemon;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TypeChart")
public class TypeChart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chart_id")
	public int chartId;
	@Column(name = "type_1")
	public Integer type1;
	@Column(name = "type_2")
	public Integer type2;
	@Column(name = "effective1_id")
	public int effective1Id;
	@Column(name = "effective1_point")
	public double effective1Point;
	@Column(name = "effective2_id")
	public int effective2Id;
	@Column(name = "effective2_point")
	public double effective2Point;
	@Column(name = "effective3_id")
	public int effective3Id;
	@Column(name = "effective3_point")
	public double effective3Point;
	@Column(name = "effective4_id")
	public int effective4Id;
	@Column(name = "effective4_point")
	public double effective4Point;
	@Column(name = "effective5_id")
	public int effective5Id;
	@Column(name = "effective5_point")
	public double effective5Point;
	@Column(name = "effective6_id")
	public int effective6Id;
	@Column(name = "effective6_point")
	public double effective6Point;
	@Column(name = "effective7_id")
	public int effective7Id;
	@Column(name = "effective7_point")
	public double effective7Point;
	@Column(name = "effective8_id")
	public int effective8Id;
	@Column(name = "effective8_point")
	public double effective8Point;
	@Column(name = "effective9_id")
	public int effective9Id;
	@Column(name = "effective9_point")
	public double effective9Point;
	@Column(name = "effective10_id")
	public int effective10Id;
	@Column(name = "effective10_point")
	public double effective10Point;
	@Column(name = "effective11_id")
	public int effective11Id;
	@Column(name = "effective11_point")
	public double effective11Point;
	@Column(name = "effective12_id")
	public int effective12Id;
	@Column(name = "effective12_point")
	public double effective12Point;
	@Column(name = "effective13_id")
	public int effective13Id;
	@Column(name = "effective13_point")
	public double effective13Point;
	@Column(name = "effective14_id")
	public int effective14Id;
	@Column(name = "effective14_point")
	public double effective14Point;
	@Column(name = "effective15_id")
	public int effective15Id;
	@Column(name = "effective15_point")
	public double effective15Point;
	@Column(name = "effective16_id")
	public int effective16Id;
	@Column(name = "effective16_point")
	public double effective16Point;
	@Column(name = "effective17_id")
	public int effective17Id;
	@Column(name = "effective17_point")
	public double effective17Point;
	@Column(name = "effective18_id")
	public int effective18Id;
	@Column(name = "effective18_point")
	public double effective18Point;
}
