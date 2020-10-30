package patterns.behavior.template;

public class TemplateMethodDemo {

	public static void main(String[] args) {
		ComputerBuilder standardComputerBuilder = new StandardComputerBuilder();
		Computer standardComputer = standardComputerBuilder.buildComputer();
		standardComputer.getComputerParts().forEach((k, v) -> System.out.println("Part : " + k + " Value : " + v));

		ComputerBuilder highEndComputerBuilder = new HighEndComputerBuilder();
		Computer highEndComputer = highEndComputerBuilder.buildComputer();
		highEndComputer.getComputerParts().forEach((k, v) -> System.out.println("Part : " + k + " Value : " + v));
	}
}
