/* 
编写一个程序，提示用户输入一个整数值，然后报告这个数是否是回文数（例如131，逆向结果也是131）。判断回文数的函数如下：
  //返回一个数是否是回文数
  public static Boolean isPalindrome(int number) 
*/
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
public class MainClass {
	public static void main (String[] args) {
		MainFrame frame = new MainFrame();
	}
}
class MainFrame extends JFrame implements ActionListener {
	private JTextField textField = new JTextField();//用户输入数据
	private JButton button = new JButton("提交");//用户提交数据
	private JLabel label = new JLabel("请输入一个整数来判断是否为回文数");
	MainFrame(){
		//设置窗体属性
		setBounds(200,200,300,100);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setTitle("回文数判断");
		setLayout(new FlowLayout());
		this.setLocationRelativeTo(null);
		setVisible(true);
		setResizable(false);

		//添加组件
		Container cp = getContentPane();
		textField.setColumns(20);
		cp.add(textField);
		cp.add(button);
		cp.add(label);

		//注册监听事件
		button.addActionListener(this);
	}

	/**
	 *	判断回文数的函数，返回true即number是回文数
	 */
	public static Boolean isPalindrome(int number){
		//将int转换为char类型便于后续比较操作
		String t = Integer.toString(number);
		char[] s=t.toCharArray();
		boolean stat = true;//默认为回文数
		//两头数字比较
		for(int i=0;i<s.length;i++){
			if(s[i]!=s[s.length-i-1]){
				//发现数字不对称时置状态为false并结束循环
				stat = false;
				break;
			}
		}
		return stat;
	}

	/**
	 *	提交按钮的事件
	 */
	public void actionPerformed(ActionEvent e) {
		if(e.getSource() == button){//判断事件源
			boolean right = true;
			//检查用户的输入是否含有非数字字符
			char[] temp = textField.getText().toCharArray();
			if((temp[0]=='-'&&temp.length == 1)||temp.length == 0){
				right = false;
			}else{
				for(int i = 0 ; i<temp.length;i++){
					if((temp[i]>'9'||temp[i] < '0') && temp[0]!='-'){
						right = false;
						break;
					}
				}
			}
			if(right){
				//将用户输入转换为int类型（）
				int num = Integer.parseInt(textField.getText());
				if(isPalindrome(num)){
					JOptionPane.showMessageDialog(this, num +"是回文数","结果", JOptionPane.INFORMATION_MESSAGE);
				}else{
					JOptionPane.showMessageDialog(this, num +"不是回文数","结果", JOptionPane.INFORMATION_MESSAGE);
				}
			}else{
				//存在非数字字符或为空
				JOptionPane.showMessageDialog(this,"非法输入，请检查是否为空或有非数字字符！","错误 ", JOptionPane.ERROR_MESSAGE);
			}
		}
	}
}