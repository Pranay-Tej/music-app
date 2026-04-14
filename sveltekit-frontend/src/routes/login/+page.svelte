<script lang="ts">
	let { form } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<h1>Login</h1>

{#if form?.error}
	<p style="color: red">{form.error}</p>
{/if}

<form method="POST" action="?/login">
	<input type="text" name="user_id" placeholder="Enter your user ID" required />
	<button type="submit">Login</button>
</form>
