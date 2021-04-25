// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	startReminder();

	let disposable = vscode.commands.registerCommand('reminder.remindme', () => {
		const reminderText =  getReminderText();
		showMessage(reminderText);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function startReminder() {
	// The code you place here will be executed every time your command is executed
	const config = vscode.workspace.getConfiguration();

	const reminderDuration = getReminderDuration();
	const reminderText =  getReminderText();
	let interval = <any>reminderDuration * 3600000;
	
	setInterval(function(){
		showMessage(reminderText);
	}, interval);
}

function showMessage(reminderText: string) {
	vscode.window.showInformationMessage( reminderText ,{ modal: true });
}

function getConfig() {
	return vscode.workspace.getConfiguration();
}

function getReminderText() {
	return <string>getConfig().get('reminder.reminderText');
}

function getReminderDuration() {
	return <string>getConfig().get('reminder.reminderDuration');
}

